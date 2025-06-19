'use server';

const serverFetch = async (url: string) => {
	const res = await fetch(url);
	const text = await res.text();
	return text;
};

export default serverFetch;
