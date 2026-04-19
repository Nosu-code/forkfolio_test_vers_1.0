// @flow strict

// MODIFICATION: Removed imports for timeConverter, BsHeartFill, FaCommentAlt
// because we no longer rely on API fields like published_at, public_reactions_count,
// or comments_count. The new static data shape only has: title, date, source, author.
import Image from 'next/image';
import Link from 'next/link';

// MODIFICATION: Removed blog.cover_image, blog.reading_time_minutes, blog.description,
// blog.public_reactions_count, blog.comments_count — those came from the dev.to API.
// The component now accepts only the four fields defined in our static data:
//   { title, date, source, author }
function BlogCard({ blog }) {

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group">

  
      <div className="h-20 lg:h-24 w-full bg-gradient-to-r from-[#1a1443] to-[#16f2b3]/20 rounded-t-lg flex items-center px-4">
        <span className="text-[#16f2b3] text-xs uppercase tracking-widest font-semibold opacity-70">
          Article
        </span>
      </div>

      <div className="p-2 sm:p-3 flex flex-col">

        <div className="flex justify-between items-center text-[#16f2b3] text-sm mb-1">
          <p>{blog.date}</p>
        </div>

        <Link target='_blank' href={blog.source}>
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500'>
            {blog.title}
          </p>
        </Link>

        <p className='mb-2 text-sm text-[#16f2b3]'>
          {blog.author}
        </p>

        <div className="mt-auto pt-3">
          <Link target='_blank' href={blog.source}>
            <button className='bg-violet-500 text-white px-3 py-1.5 rounded-full text-xs'>
              Voir l'article
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;
