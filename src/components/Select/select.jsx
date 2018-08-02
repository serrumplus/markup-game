import React from 'react';
import styles from "./select.scss";
import svgImage from '../../images/svgs/icon1.svg';
import svgImage2 from '../../images/svgs/icon2.svg';

console.log(svgImage);

const usage = `<svg viewBox="${svgImage.viewBox}">
    <use xlink:href="#${svgImage.id}"></use>
</svg><svg viewBox="${svgImage2.viewBox}">
<use xlink:href="#${svgImage2.id}"></use>
</svg>`;

export class Select extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.item}>xxx</div>
                <div className={styles.loading}>sdfsdf</div>
                <div dangerouslySetInnerHTML={{__html: usage}} />
            </React.Fragment>
        )
    }
}