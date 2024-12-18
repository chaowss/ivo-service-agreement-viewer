import React from 'react';
import './ServiceAgreementViewer.css';

export interface JsonElement {
    type?: 'block' | 'clause' | 'mention' | 'h1' | 'h4' | 'p' | 'li' | 'ul' | 'lic';
    children?: JsonElement[];
    color?: string;
    bold?: boolean;
    underline?: boolean;
    text?: string;
    title?: string;
    id?: string;
    value?: string;
}


const ServiceAgreementViewer = ({ element }: { element: JsonElement }) => {
    const renderContent = (el: JsonElement) => {
        switch (el.type) {
            case 'block':
                return (
                    <div className="document-root clause-container block" title={el.title}>
                        {el.children?.map((child, index) => (
                            <React.Fragment key={index}>
                                <ServiceAgreementViewer element={child} />
                            </React.Fragment>
                        ))}
                    </div>
                );
            case 'clause':
                return (
                    <div className="clause" title={el.title}>
                        {el.children?.map((child, index) => <ServiceAgreementViewer key={index} element={child} />)}
                    </div>
                );
            case 'mention':
                // assuming that the mention does not have children
                return (
                    <span 
                        id={el.id}
                        className="mention" 
                        style={{ backgroundColor: el.color }}
                    >
                        {el.value}
                    </span>
                );
            case 'p':
                return (
                    <span className="p">
                        {el.text}
                        {el.children?.map((child, index) => <ServiceAgreementViewer key={index} element={child} />)}
                    </span>
                );
            case 'h1':
                return React.createElement(
                    'h1',
                    { title: el.title },
                    el.children?.map((child, index) => <ServiceAgreementViewer key={index} element={child} />)
                );
            case 'h4':
                return (
                    <h4 title={el.title}>
                        {el.children?.map((child, index) => {
                            const style = {
                                fontWeight: child.bold ? 'bold' : 'normal',
                                textDecoration: child.underline ? 'underline' : 'none',
                            };
                            return (
                                <span key={index} style={style}>
                                    {child.text}
                                </span>
                            );
                        })}
                    </h4>
                );
            case 'li':
            case 'ul':
            case 'lic':
                const ElementTag = el.type === 'lic' ? 'div' : el.type;
                return React.createElement(
                    ElementTag,
                    null,
                    el.children?.map((child, index) => <ServiceAgreementViewer key={index} element={child} />)
                );
            default:
                const style = {
                    fontWeight: el.bold ? 'bold' : undefined,
                    textDecoration: el.underline ? 'underline' : undefined,
                };
                return <span style={style}>{el.text}</span>;
        }
    };

    return renderContent(element);
};

export default ServiceAgreementViewer;
