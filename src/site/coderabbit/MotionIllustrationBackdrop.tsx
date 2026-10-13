/** Dim PR-style grid behind spotlight cards (CodeRabbit High Value pattern). */
const MotionIllustrationBackdrop = () => (
  <div className="cr-motion-illust__backdrop" aria-hidden>
    {Array.from({ length: 9 }, (_, index) => (
      <span
        key={index}
        className={`cr-motion-illust__ghost${index === 4 ? ' cr-motion-illust__ghost--hole' : ''}`}
      />
    ))}
  </div>
);

export default MotionIllustrationBackdrop;
