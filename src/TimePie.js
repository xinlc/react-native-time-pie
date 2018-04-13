
/**
 * TimePie
 * Created by xinlc on 13/04/2018.
 */

import React, { PureComponent } from 'react';
import { View, Text, ART } from 'react-native';
import * as shape from 'd3-shape';

const d3 = {
  shape,
};

const {
  Surface,
  Group,
  Shape,
} = ART;

class TimePie extends PureComponent {
  static defaultProps = {
    data: [],  // { startTime: '08:00', endTime: '11:00', fillColor: '#000' };
    options: {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 250,
      height: 250,
      r: 0,
      R: 125,
      borderWidth: 14,
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#535353'
      }
    }
  };

  render() {
    const { data, options } = this.props;
    const arcs = [];
    const arcsLabel = [];
    data.map((item, index) => {
      // 计算小时和分钟弧度
      const shrad = (2 * Math.PI / 24 / 60) * item.startTime.split(':')[0] * 60;
      const smrad = (2 * Math.PI / 24 / 60) * item.startTime.split(':')[1];

      const ehrad = (2 * Math.PI / 24 / 60) * item.endTime.split(':')[0] * 60;
      const emrad = (2 * Math.PI / 24 / 60) * item.endTime.split(':')[1];

      const startAngle = shrad + smrad;
      const endAngle = ehrad + emrad;

      const arcGenerator = d3.shape.arc()
        .outerRadius(options.R)
        .innerRadius(options.r + 5)
        .startAngle(startAngle)
        .endAngle(endAngle);

      const id = `pie_shape_${index}`;

      // const labelX = arcGenerator.centroid()[0];
      // const labelY = arcGenerator.centroid()[1];

      const arcStartPointGenerator = d3.shape.arc()
        .outerRadius(options.R + options.borderWidth)
        .innerRadius(options.R + options.borderWidth)
        .startAngle(startAngle)
        .endAngle(startAngle);
      const startLabelX = arcStartPointGenerator.centroid()[0];
      const startLabelY = arcStartPointGenerator.centroid()[1];

      const arcEndPointGenerator = d3.shape.arc()
        .outerRadius(options.R + options.borderWidth)
        .innerRadius(options.R + options.borderWidth)
        .startAngle(endAngle)
        .endAngle(endAngle);
      const endLabelX = arcEndPointGenerator.centroid()[0];
      const endLabelY = arcEndPointGenerator.centroid()[1];
      // const x = options.R * Math.cos(startAngle);
      // const y = options.R * Math.sin(startAngle);

      arcs.push({
        id: id,
        fillColor: item.fillColor,
        strokeColor: item.fillColor,
        arcGenerator: arcGenerator,
        startTime: item.startTime,
        endTime: item.endTime,
        // labelX: labelX,
        // labelY: labelY,
        rotateZ: 180 / Math.PI * Math.abs((startAngle + endAngle) / 2) - 90
      });
      arcsLabel.push({
        id: `${id}-start`,
        Time: item.startTime,
        labelX: startLabelX,
        labelY: startLabelY,
      });
      arcsLabel.push({
        id: `${id}-end`,
        Time: item.endTime,
        labelX: endLabelX,
        labelY: endLabelY,
      });

      return null;
    });

    const x = options.width / 2 + 20;
    const y = options.height / 2 + 20;

    // 创建背景圆
    const bgArcGenerator = d3.shape.arc()
    .outerRadius(options.R)
    .innerRadius(options.r)
    .startAngle(0)
    .endAngle(2 * Math.PI);
    return (
      <View style={{ overflow: 'visible', marginVertical: 30 }}>
        <Surface width={options.width} height={options.height}>
          <Group x={x - options.margin.left} y={y - options.margin.top}>
            <Shape
              d={bgArcGenerator()}
              stroke={'#f3f3f3'}
              fill={'#f3f3f3'}
            />
            {
              arcs.map((arc) => {
                return (
                  <Shape
                    key={arc.id}
                    d={arc.arcGenerator()}
                    stroke={arc.strokeColor}
                    fill={arc.fillColor}
                  />
                );
              }
              )
            }
          </Group>
        </Surface>
        {
          arcsLabel.map((arc) => {
            return (
              <Text
                key={`label_${arc.id}`}
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  left: x - options.margin.left - 15 + arc.labelX,
                  top: y - options.margin.top - 5 + arc.labelY,
                  backgroundColor: 'transparent',
                  color: options.label.color,
                  fontWeight: options.label.fontWeight,
                  fontSize: options.label.fontSize,
                  fontFamily: options.label.fontFamily,
                }}
              >
                { arc.Time }
              </Text>
            );
          }
          )
        }
      </View>
    );
  }
}

export default TimePie;
