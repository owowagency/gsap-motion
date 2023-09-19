import { useEffect, useState } from 'react';

export type CodepenProps = {
    title?: string;
    id?: string;
};

export function Codepen({ title = 'interactive example', id = 'JjwNMBv' }: CodepenProps) {
    const [isClient, setIsClient] = useState(false);
    const url = `https://codepen.io/stef-owow/embed/${id}`;

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="w-full my-10">
            {isClient && (
                <iframe
                    className="codepen h-96 w-full"
                    title={title}
                    src={`${url}?default-tab=result&editable=true`}
                    loading="lazy"
                >
                    See the Pen <a href={`https://codepen.io/stef-owow/pen/${id}`}>{title}</a> by
                    Stef (<a href="https://codepen.io/stef-owow">@stef-owow</a>) on{' '}
                    <a href="https://codepen.io">CodePen</a>.
                </iframe>
            )}
        </div>
    );
}
