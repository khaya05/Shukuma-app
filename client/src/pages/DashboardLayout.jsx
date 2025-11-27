/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import {
  BigNavbar,
  BigSidebar,
  BigSidebarBtn,
  Modal,
  SmallNavbar,
  SmallSidebar,
} from '../components';
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import customFetch from '../util/customFetch';

const DashboardContext = createContext();

export const dashboardLoader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    if (!data) {
      return redirect('/');
    }
    return data;
  } catch (error) {
    if (error.response?.status === 401) {
      return redirect('/');
    }
    throw error;
  }
};

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentTab, setCurrentTab] = useState('Dashboard');

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <DashboardContext.Provider
      value={{
        user,
        showModal,
        showSidebar,
        currentTab,
        setShowModal,
        setShowSidebar,
        setCurrentTab,
      }}
    >
      <div className={`dashboard-layout h-[100%]`}>
        <SmallNavbar />
        {showModal && <Modal />}
        {showModal && <SmallSidebar />}
        <BigNavbar />
        {showSidebar && <BigSidebar />}
        {!showSidebar && <BigSidebarBtn />}
        <div
          className={`${
            showSidebar
              ? 'md:translate-x-[300px] md:w-[calc(100vw-300px-1rem)] h-[100%]'
              : ''
          }`}
        >
          {isLoading ? (
            <p className='text-2xl text-bold w-full h-[100vh]'>Loading...</p>
          ) : (
            <Outlet context={{ user }} />
          )}
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
