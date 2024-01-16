function toButton(button) {
    const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
    `;
    return `
    <div class="button ${button.active ? "active" : ""}"
    ${meta}
    >
        <span class="material-symbols-outlined" ${meta}>
            ${button.icon}
        </span>
    </div>
    `;
}

export function createToolbar(state) {
    const buttons = [
        {
            icon: "format_align_left",
            active: state["textAlign"] === "left",
            value: { textAlign: "left" }
        },
        {
            icon: "format_align_center",
            active: state["textAlign"] === "center",
            value: { textAlign: "center" }
        },
        {
            icon: "format_align_right",
            active: state["textAlign"] === "right",
            value: { textAlign: "right" }
        },
        {
            icon: "format_bold",
            active: state["fontWeight"] === "bold",
            value: {
                fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold"
            }
        },
        {
            icon: "format_italic",
            active: state["fontStyle"] === "italic",
            value: {
                fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic"
            }
        },
        {
            icon: "format_underlined",
            active: state["textDecoration"].includes("underline"),
            value: {
                textDecoration: state["textDecoration"].includes("underline")
                    ? state["textDecoration"].replace("underline", "").trim()
                    : (state["textDecoration"] + " underline").trim()
            }
        },
        {
            icon: "format_strikethrough",
            active: state["textDecoration"].includes("line-through"),
            value: {
                textDecoration: state["textDecoration"].includes("line-through")
                    ? state["textDecoration"].replace("line-through", "").trim()
                    : (state["textDecoration"] + " line-through").trim()
            }
        }
    ];
    return buttons.map(toButton).join("");
}
