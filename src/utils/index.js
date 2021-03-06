/**
 * Mix two numbers or array fo numbers as
 * a * (1-alpha) + b * alpha
 * @param {number | number[]} a
 * @param {number | number[]} b
 * @param {number} alpha mixing weight
 */
export function linearMix(a, b, alpha) {
    if (Array.isArray(a)) {
        return a.map((aa, i) => linearMix(aa, b[i], alpha));
    } else {
        return a + (b - a) * alpha;
    }
}

/**
 * Find the local angle of an SVG path using a Finite Difference approximation.
 * @param {snap.Element} snapPath snap.Element
 * @param {number} position between 0 and 1
 * @param {number} totalLength of the path
 * @return {number} angle in degrees
 */
export function getAngleAtPath(path, position, totalLength) {
    const delta = 1 / 60;
    const p1 = Math.min(position, 1 - delta);
    const p2 = p1 + delta;
    const c1 = path.getPointAtLength(totalLength * p1);
    const c2 = path.getPointAtLength(totalLength * p2);
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    return (Math.atan2(dy, dx) / Math.PI) * 180;
}

export function copyToClipboard(document, str) {
    console.log("copying", str);
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}
