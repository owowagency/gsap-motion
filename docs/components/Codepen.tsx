import { useEffect, useState } from "react";
import Script from "next/script";

export type CodepenProps = {
  title?: string;
  id?: string;
};

export function Codepen({ title = "interactive example", id = "JjwNMBv" }: CodepenProps) {
  const [isClient, setIsClient] = useState(false);
  const url = `https://codepen.io/stef-owow/embed/${id}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="w-full my-10">
      {isClient && (
        <p
          className="codepen h-96 flex items-center justify-center"
          data-height="384"
          data-default-tab="js,result"
          data-slug-hash={id}
          data-editable="true"
          data-user="stef-owow"
        >
          <span>
            See the Pen <a href={url}>{title}</a> by Stef (
            <a href="https://codepen.io/stef-owow">@stef-owow</a>) on{" "}
            <a href="https://codepen.io">CodePen</a>.
          </span>
        </p>
      )}
      <Script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></Script>
    </div>
  );
}
