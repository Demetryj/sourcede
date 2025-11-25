export const renderRichParagraph = content =>
  typeof content === 'string' ? (
    <p dangerouslySetInnerHTML={{ __html: content }} />
  ) : (
    <p>{content}</p>
  );
