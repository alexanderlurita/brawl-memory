export default function BrawlerImage({ image }) {
  return (
    <img
      className='brawler'
      src={`/images/${image}`}
      alt={`Brawler ${image.replace('.png', '')}`}
    />
  )
}
