const RenderTipTapHtml = ({ __html }: { __html: string }) => {
  return (
    <div
      className={`editor text-justify`}
      dangerouslySetInnerHTML={{ __html }}
    ></div>
  )
}

export default RenderTipTapHtml
