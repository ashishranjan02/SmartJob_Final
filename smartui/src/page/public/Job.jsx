import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Pagination, Container, Grid, CircularProgress } from "@mui/material";
import Filters from "../../components/Filter";
import JobCard from "../../components/JobCard";
import AdsPanel from "../../components/AdsPanel";
import Header from "../../components/Header";
import { fetchJobs } from "../../features/jobs/JobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const [filters, setFilters] = useState({
    jobFunction: [],
    location: [],
    experience: [],
    salary: [],
  });

  const [page, setPage] = useState(1);          
  const jobsPerPage = 5;                        

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchJobFunction =
        filters.jobFunction.length === 0 ||
        filters.jobFunction.includes(job.jobFunction);

      const matchLocation =
        filters.location.length === 0 ||
        filters.location.some((loc) => job.location.includes(loc));

      const matchExperience =
        filters.experience.length === 0 ||
        filters.experience.includes(job.experience);

      const matchSalary =
        filters.salary.length === 0 ||
        filters.salary.includes(job.salary);

      return matchJobFunction && matchLocation && matchExperience && matchSalary;
    });
  }, [filters, jobs]);

  // Pagination logic
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to top
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Header />
      <Grid container spacing={2} sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        {/* Filters */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Filters filters={filters} setFilters={setFilters} />
        </Grid>

        {/* Jobs + Ads */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            {/* Jobs */}
            <Box sx={{ flex: 1, p: 2 }}>
              {loading && <CircularProgress />}
              {error && <Typography color="error">{error}</Typography>}

              {!loading && !error && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {filteredJobs.length} Jobs Found
                  </Typography>
                  {paginatedJobs.map((job, idx) => (
                    <JobCard key={idx} job={job} />
                  ))}
                  {filteredJobs.length === 0 && (
                    <Typography color="error">
                      No jobs found for selected filters.
                    </Typography>
                  )}
                  {pageCount > 1 && (
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      sx={{ mt: 2 }}
                    />
                  )}
                </>
              )}
            </Box>

            {/* Ads */}
            <Box
              sx={{
                width: { xs: "100%", sm: 260 },
                flexShrink: 0,
                p: 2,
              }}
            >
              <AdsPanel />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Jobs;