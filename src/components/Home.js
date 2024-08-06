import { useCallback, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";

const Home = () => {
  const [XMLdata, setXMLdata] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false)
  const [loadingContent, setLoadingContent] = useState("Parsing Sitemap...")

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        const data = await axios.get('https://webscrapping-backend.vercel.app/data/get-sitemap', {
            params: {
                domain: domain.trim()
            }
        })
        // console.log(data.data);
        setLoadingContent("Fetching Data...")
        
        const siteData = await axios.get(`https://webscrapping-backend.vercel.app/data/scrap-xml`, {
            params: {
              url: data.data,
            },
          });
          setXMLdata(siteData.data);
        //   console.log(siteData.data);
          setLoading(false)
          setLoadingContent("Parsing Sitemap...")
  
          for (let i = 0; i < siteData.data.length; i++) {
            const summary = await axios.get(
              `https://webscrapping-backend.vercel.app/data/summarize`,
              {
                params: {
                  url: siteData.data[i].loc,
                },
              }
            );
  
            setSummaryData((prev) => {
              const temp = [...prev];
              temp[i] = summary.data;
              return temp;
            });
          }
        
    } catch (error) {
        console.log(error);
    }
  }, [domain]);

  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search"
          placeholder="Domain Name: https://"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button type="submit" className="submitBtn" disabled={loading}>
          {loading ? "Scrapping..." : "Start Scraping"}
        </button>
      </form>
      <div className="products">
        {!loading ? XMLdata.map((data, ind) => (
          <Card key={ind} data={data} summary={summaryData[ind]} />
        )) : <Loader loadingContent={loadingContent} />}
      </div>
    </div>
  );
};

export default Home;
