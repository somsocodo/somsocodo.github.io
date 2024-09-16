import { Box } from '@mui/material';
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import useWindowDimensions from '../helpers/windowDimensions';
import { Font } from 'p5';

export function Secret() {
  const { width, height } = useWindowDimensions();

  function heart(p5: P5CanvasInstance, x: number, y: number, size: number) {
    p5.strokeWeight(5);
    p5.stroke(255, 255, 255);
    p5.beginShape();
    p5.vertex(x, y);
    p5.bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
    p5.bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
    p5.endShape();
  }

  function sketch(p5: P5CanvasInstance) {
    let roboto: Font;
    p5.preload = () => {
      roboto = p5.loadFont('./Roboto-BoldItalic.otf');
    };
    p5.setup = () => {
      p5.createCanvas(width, height, p5.WEBGL);
      p5.background('#17191a');
      p5.textFont(roboto);
    };

    p5.draw = () => {
      p5.background('#17191a');
      p5.normalMaterial();
      p5.push();
      p5.rotateY(p5.frameCount * 0.01);
      p5.translate(0, -height / 2 / 2, 1);
      p5.scale(height / 300);
      heart(p5, 0, 0, 100);
      p5.translate(-60, -10, 1);
      p5.textSize(40);
      p5.text('W + C', 10, 50);
      p5.scale(-1, 1);
      p5.translate(-115, 0, -3);
      p5.text('4eva', 10, 50);
      p5.pop();
    };
  }

  return (
    <Box overflow={'auto'}>
      <ReactP5Wrapper sketch={sketch} />
    </Box>
  );
}
