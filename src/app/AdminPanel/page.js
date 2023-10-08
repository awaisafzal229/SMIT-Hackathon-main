"use client"
import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminPanelCards from '../(components)/AdminPanelCards/AdminPanelCards';
import { Chart, registerables } from 'chart.js/auto';
import Link from 'next/link';

Chart.register(...registerables);

function AdminPanel() {
  let navBar = [
    { title: 'Dashboard', links: [{ componentName: 'Go to Dashboard', path: '/AdminPanel' }] },
    {
      title: 'Data',
      links: [
        { componentName: 'Students Data', path: '/StudentsData' },
        { componentName: 'Courses Data', path: '/CourseData' },
      ],
    },
    {
      title: 'Registrations',
      links: [
        { componentName: 'Student Registration', path: '/StudentRegistration' },
        { componentName: 'Course Registration', path: '/CourseRegistration' },
      ],
    },
    {
      title: 'About',
      links: [{ componentName: 'About Us', path: '/#' }, { componentName: 'LogOut', path: '/#' }],
    },
  ];

  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchStudentsCount = async () => {
      try {
        const collectionName = collection(db, 'students');
        const docs = await getDocs(collectionName);
        setStudents(docs.size);
      } catch (error) {
        console.error('Error fetching students data:', error);
      }
    };

    const fetchCoursesCount = async () => {
      try {
        const collectionName = collection(db, 'courses');
        const docs = await getDocs(collectionName);
        setCourses(docs.size);
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };

    fetchStudentsCount();
    fetchCoursesCount();
  }, []);

  useEffect(() => {
    const updateGraph = () => {
      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['All Students', 'All Courses'],
            datasets: [
              {
                label: 'Total',
                data: [students, courses],
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    };

    updateGraph();
  }, [students, courses]);

  return (
    <div className="flex bg-purple-300 h-screen">
      <aside className="w-1/6 my-6">
        <div className="float-right mr-4 ">
          {navBar.map((card, index) => {
            return <AdminPanelCards card={card} key={index} />;
          })}
        </div>
      </aside>
      <div className="w-10/12 my-6 bg-violet-300 h-fit">
        <section className="flex justify-between shadow-md divide-x-2 rounded bg-violet-200 py-9 my-5">
          <div className="flex w-1/3 justify-between px-5">
            <img
              src="https://logowik.com/content/uploads/images/student5651.jpg"
              width={90}
              height={90}
            />
            <div className="flex flex-col">
              <p>{students}</p>
              <p>Total Students</p>
            </div>
          </div>
          <div className="flex w-1/3 justify-between px-5">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/017/402/original/transparent-training-icon-free-png.png"
              width={60}
              height={20}
            />
            <div className="flex flex-col">
              <p>{courses}</p>
              <p>Total Courses</p>
            </div>
          </div>
          <div className="flex w-1/3 justify-between px-5">
            <img src="https://shoe-paradies-myok1ii3u-aliahmad051999-gmailcom.vercel.app/dollor.png" />
            <div className="flex flex-col">
              <p>71703</p>
              <p>Total Revenue</p>
            </div>
          </div>
        </section>
        <div className=" mx-5">
          <canvas id="myChart" ref={chartRef} width="250" height="100"></canvas>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;