import DashboardMetricsCards from "../components/DashboardMetricsCards";

function Dashboard() {

  return (
    <div className="w-full p-14 flex flex-col items-start justify-start">
      <h1 className="font-medium text-3xl">Welcome Back !</h1>
      <p className="pt-2 text-gray-500 text-lg">Continue your learning journey</p>

      <div className="w-full flex flex-col md:flex-row items-stretch justify-start">
        <DashboardMetricsCards field={"Enrolled Courses"} value={3} />
        <DashboardMetricsCards field={"Completed"} value={0} />
        <DashboardMetricsCards field={"Hours Learned"} value={23} />
        <DashboardMetricsCards field={"Avg. Progress"} value={"47%"} />
      </div>
    </div>
  )
}

export default Dashboard