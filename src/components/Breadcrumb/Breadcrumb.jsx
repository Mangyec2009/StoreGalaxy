import Link from 'next/link';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 mt-[50px] text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link href={item.href} legacyBehavior>
                <a className="text-gray-600 hover:underline">{item.label}</a>
              </Link>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-1 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
