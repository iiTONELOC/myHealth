export const getWidth = () => {
    return window.innerWidth
}
export const getHeight = () => {
    return window.innerHeight
}

export const appResize = ({ setWidth, setHeight }) => {
    const resizeHandler = () => {
        setWidth(getWidth);
        setHeight(getHeight)
    }
    window.addEventListener('resize', resizeHandler);
}