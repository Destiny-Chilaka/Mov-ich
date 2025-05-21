import { useState, useEffect, useCallback } from "react";
import HeroHeader from "../components/HeroHeader";
import UpcomingMovies from "../components/UpcomingMovies";
import PopularMovies from "../components/PopularMovies";
import TopRatedMovies from "../components/TopRatedMovies";
import PreLoader from "../components/PreLoader";

function Home() {
  const [loadingStates, setLoadingStates] = useState({
    heroHeader: true,
    upcomingMovies: true,
    popularMovies: true,
    topRatedMovies: true,
  });

  const handleLoadingChange = useCallback(
    (section, isLoading) => {
      setLoadingStates((prev) => {
        if (prev[section] !== isLoading) {
          return {
            ...prev,
            [section]: isLoading,
          };
        }
        return prev; // Avoid update if no change
      });
    },
    [] // setLoadingStates is stable, no additional dependencies needed
  );

  // Check if any section is still loading
  const isLoading = Object.values(loadingStates).some((state) => state);

  useEffect(() => {
    // This effect can log or handle initial state if needed, but not update state here
    console.log("Loading states:", loadingStates);
  }, [loadingStates]); // Safe to log when loadingStates changes

  return (
    <>
      {isLoading && <PreLoader />}
      <div className={`bg-white ${isLoading ? "hidden" : "block"}`}>
        <HeroHeader
          onLoadingChange={(loading) =>
            handleLoadingChange("heroHeader", loading)
          }
        />
        <UpcomingMovies
          onLoadingChange={(loading) =>
            handleLoadingChange("upcomingMovies", loading)
          }
        />
        <PopularMovies
          onLoadingChange={(loading) =>
            handleLoadingChange("popularMovies", loading)
          }
        />
        <TopRatedMovies
          onLoadingChange={(loading) =>
            handleLoadingChange("topRatedMovies", loading)
          }
        />
      </div>
    </>
  );
}

export default Home;
