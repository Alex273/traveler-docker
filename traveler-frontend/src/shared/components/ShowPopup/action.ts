export const defaultEventName = `show-popup-event ${Math.random()}`;

export function ShowPopup(content: any, customEventName?: string) {
    return new Promise(resolve => {
        const detail = {
            content,
            closeCallBack: () => resolve(false),
        };

        const customEvent = new CustomEvent(customEventName || defaultEventName, {detail});

        window.dispatchEvent(customEvent);
    });
}
