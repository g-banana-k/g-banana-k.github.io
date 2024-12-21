export const FlexSpace = (props: { size?: number }) => {
	return <div style={`flex-grow: ${props.size ?? 1}`} />;
};
