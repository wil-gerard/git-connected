import { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { UserCard } from '../components/UserCard';
import { useUserContext } from '../hooks/UserContext';
import React, { useEffect, useState } from 'react';
import { IUser } from '../interface';
import apiClient from '../api/apiClient';

const Container = tw.div`flex flex-col px-6 text-gray-100`;
const Content = tw.div`flex-row flex max-w-screen-xl mx-auto py-2`;
const Header = tw.h1`flex flex-col items-center text-5xl font-bold mb-0`;

export default function Featured() {
  const { currentUser } = useUserContext();

  const [users, setUsers] = useState<IUser[]>();
  useEffect(() => {
    apiClient.get('/api/user/getallusers').then(
      (res: AxiosResponse) => {
        setUsers(res.data);
      }
    );
  }, [currentUser]);

  if (!users) {
    return <p>Loading...</p>;
  }

  const randomIndex = Math.floor(Math.random() * users.length);
  const randomUser = users[randomIndex];

  return (
    <>
      <Container>
        <Header>Git to Know...</Header>
        <Content>
          <UserCard {...randomUser} />
        </Content>
      </Container>
    </>
  );
}
