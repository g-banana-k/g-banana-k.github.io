export const isArray = <T>(v: unknown): v is Array<T> => {
    const v2 = v as { at: true; pop: true };
    // biome-ignore lint/complexity/noUselessTernary: <explanation>
    return v2.at && v2.pop ? true : false;
};
