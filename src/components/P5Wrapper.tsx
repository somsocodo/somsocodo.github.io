'use client';

import P5 from 'p5';
import React, { useEffect, useRef } from 'react';

interface Props {
	sketch: (p5: P5) => void;
}

const P5Wrapper = ({ sketch }: Props) => {
	const p5ContainerRef = useRef<HTMLDivElement>(null);
	const p5InstanceRef = useRef<P5 | null>(null);

	useEffect(() => {
		if (p5ContainerRef.current) {
			p5InstanceRef.current?.remove();
			p5InstanceRef.current = new P5(sketch, p5ContainerRef.current);
		}
	}, [sketch]);

	return <div ref={p5ContainerRef} />;
};

export default P5Wrapper;
