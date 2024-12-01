import "./DashBoard.scss";
import { getDashboardOverView } from "../../services/aipServices";
import { useState, useEffect } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
const DashBoard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    const res = await getDashboardOverView();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
    }
    console.log(res);
    let us = 0,
      qz = 0,
      as = 0,
      qs = 0;
    us = res?.DT?.users?.total ?? 0;
    qz = res?.DT?.others?.countQuiz ?? 0;
    as = res?.DT?.others?.countAnswers ?? 0;
    qs = res?.DT?.others?.countQuestions ?? 0;
    const data = [
      {
        name: "User",
        us: us,
      },
      {
        name: "Quizzes",
        qz: qz,
      },
      {
        name: "Answers",
        as: as,
      },
      {
        name: "Questions",
        qs: qs,
      },
    ];
    setDataChart(data);
  };

  return (
    <div className="dashBoard-container">
      <div className="title">Analytic DashBoard</div>
      <div className="content">
        <div className="dashBoard-left">
          <div className="child">
            <span className="title1">Total users</span>
            <span className="title2">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            {" "}
            <span className="title1">Total Quizzes</span>
            <span className="title2">
              {" "}
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            {" "}
            <span className="title1">Total Answers</span>
            <span className="title2">
              {" "}
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            {" "}
            <span className="title1">Total Questions</span>
            <span className="title2">
              {" "}
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="dashBoard-right">
          <ResponsiveContainer width={"95%"} height={"90%"}>
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar dataKey="us" fill="#8884d8" />
              <Bar dataKey="qz" fill="#82ca9d" />
              <Bar dataKey="as" fill="#6cb5a8" />
              <Bar dataKey="qs" fill="#f1a2f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
