import { createMemoryRouter } from 'react-router-dom';
import AuthorizationChecker from '../components/AuthorizationChecker';
import WelcomeScreen from '../components/WelcomeScreen';
import Popup from '../pages/Popup/Popup';
import React from 'react';

export enum RoutesName {
  BARRIER = '/',
  WELCOME = '/welcome',
  HOME = '/home',
}

export const router = createMemoryRouter(
  [
    {
      path: RoutesName.BARRIER,
      element: <AuthorizationChecker />,
    },
    {
      path: RoutesName.WELCOME,
      element: <WelcomeScreen />,
    },
    {
      path: RoutesName.HOME,
      element: <Popup />,
    },
  ],
  {
    initialEntries: ['/'],
    initialIndex: 1,
  }
);
