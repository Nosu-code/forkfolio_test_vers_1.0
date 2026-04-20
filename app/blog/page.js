// @flow strict

// MODIFICATION: Removed import of personalData — it was only used to build the
// dev.to API URL. We no longer make any network request, so it's unnecessary.
import BlogCard from "../components/homepage/blog/blog-card";

// MODIFICATION: Replaced the async getBlogs() function that fetched from
// https://dev.to/api/articles with a static array of objects.
// Each object contains exactly the four fields BlogCard now expects:
//   - title  : the article's title
//   - date   : publication date (formatted string)
//   - source : full URL to the original article
//   - author : name of the author or publishing organisation
const blogs = [
  {
    title: "Quand les algorithmes broient le social",
    date: "2025-02-12",
    source: "https://www.lemondeinformatique.fr/actualites/lire-quand-les-algorithmes-broient-le-social-96857.html",
    author: "Le Monde Informatique",
  },
  {
    title: "Five Trends in AI and Data Science for 2026",
    date: "2026-06-01",
    source: "https://sloanreview.mit.edu/article/five-trends-in-ai-and-data-science-for-2026/",
    author: "directeur de faculté MIT : Thomas H. Davenport",
  },
  {
    title: "How cognitive manipulation and AI will shape disinformation in 2026",
    date: "2026-12-03",
    source: "https://www.weforum.org/stories/2026/03/how-cognitive-manipulation-and-ai-will-shape-disinformation-in-2026/",
    author: "Alan Jagolinzer Professor of Financial Accounting",
  },
  {
    title: "Cognitive Assemblages: Living with Algorithms (rapport d'étude)",
    date: "2026-16-02",
    source: "https://www.mdpi.com/2504-2289/10/2/63#",
    author: " Stéphane Grumbach : chercheur à l'INRIA",
  },
  {
    title: " 12 Graphs, AI investment is skyrocketing while AI’s impact on jobs and public perception remains mixed",
    date: "2026-13-04",
    source: "https://spectrum.ieee.org/state-of-ai-index-2026",
    author: "Matthew S. Smith lead reviews editor at Digital Trends.",
  },
];

// MODIFICATION: Converted page() from async to a regular function.
// There is no longer any awaited network call, so async is unnecessary.
function page() {

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            Veille technologique
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="order-2 lg:order-1">
        <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
          L&apos;influence des algorithmes et leur tendances
        </p>
      </div>

      <div>
        <p>
          Les algorithmes s&apos;immiscent dans notre quotidienne avec l&apos;évolution des réseaux sociaux et des sites de e-commerces ;
          mais l&apos;exposition à des contenus proposés par des algorithmes de plus en plus complexe a une influence sur le marché et le consommateur. Cette influence affecte les tendances des nouveaux algorithmes et leur conceptions.
        </p>
      </div>

  <div> </div>
      {/* MODIFICATION: Replaced blogs.map(...) that filtered on blog?.cover_image
          (an API-specific field) with a straightforward map over our static array.
          Every entry is always rendered — no cover_image guard needed. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.map((blog, i) => (
          <BlogCard blog={blog} key={i} />
        ))}
      </div>
    </div>
  );
};

export default page;
