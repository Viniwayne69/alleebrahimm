import Image from 'next/image';
import portrait from '../../public/images/alle.jpg';

export function Avatar() {
  return <div className="avatar"><Image src={portrait} alt="Allê Ebrahim sorrindo, com óculos, brincos dourados e roupa vermelha" width={200} height={200} priority fetchPriority="high" decoding="sync" sizes="(max-width: 393px) 52vw, 200px" /></div>;
}

