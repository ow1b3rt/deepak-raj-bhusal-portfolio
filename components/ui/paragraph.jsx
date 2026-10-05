export function Paragraph({ text }) {
  const paras = text.split('\n').filter(para => para.trim() !== '');

  return (
    <>
      {paras.map((para, index) => (
        <p key={index} className="text-xl text-gray-300">
          {para}
        </p>
      ))}
    </>
  );
}


