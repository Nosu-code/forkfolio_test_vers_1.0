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

      {/* MODIFICATION: Removed the cover image block entirely.
          It depended on blog.cover_image which no longer exists in static data.
          Replaced with a decorative placeholder header to keep the card visually balanced. */}
      <div className="h-20 lg:h-24 w-full bg-gradient-to-r from-[#1a1443] to-[#16f2b3]/20 rounded-t-lg flex items-center px-4">
        <span className="text-[#16f2b3] text-xs uppercase tracking-widest font-semibold opacity-70">
          Article
        </span>
      </div>

      <div className="p-2 sm:p-3 flex flex-col">

        {/* MODIFICATION: Replaced the date+reactions row.
            We now show only the publication date from our static `date` field.
            Removed reaction/comment counts since they don't exist in static data. */}
        <div className="flex justify-between items-center text-[#16f2b3] text-sm mb-1">
          <p>{blog.date}</p>
        </div>

        {/* MODIFICATION: blog.url → blog.source (our static field name for the link).
            The title still links out to the article, behaviour unchanged. */}
        <Link target='_blank' href={blog.source}>
          <p className='my-2 lg:my-3 cursor-pointer text-lg text-white sm:text-xl font-medium hover:text-violet-500'>
            {blog.title}
          </p>
        </Link>

        {/* MODIFICATION: Added author display — new field in static data, not in API. */}
        <p className='mb-2 text-sm text-[#16f2b3]'>
          {blog.author}
        </p>

        {/* MODIFICATION: Removed blog.description and blog.reading_time_minutes display.
            Those fields came from the dev.to API and don't exist in static data.
            Replaced with a direct "Read article" link for better usability. */}
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
