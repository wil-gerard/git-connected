import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import tw from 'twin.macro';
import { UserCard } from '../components/UserCard';
import { Spinner } from '../components/Spinner';
import { useUserContext } from '../hooks/UserContext';
import { SanitizedUser } from '../interface';
import clientApi from '../api/clientApi';
import { PageTitle as BasePageTitle } from '../components/misc/Typography';

const Container = tw.div`relative w-full px-10 lg:mx-auto pb-64`;
const Content = tw.div`flex flex-col mx-auto items-center`;
const TextContent = tw.div`py-8 text-center`;
const PageTitle = tw(BasePageTitle)`flex flex-col items-center`;

export default function Featured() {
  const { currentUser } = useUserContext();

  const [randomUser, setRandomUser] = useState<SanitizedUser>();
  useEffect(() => {
    clientApi.get('/api/user/getrandomuser').then((res: AxiosResponse) => {
      setRandomUser(res.data);
    });
  }, [currentUser]);

  if (!randomUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner /> 
      </div>
      
    );
  }

  return (
    <>
      <Container>
        <TextContent>
          <PageTitle>Featured 100Dev</PageTitle>
        </TextContent>
        <Content>
          <UserCard {...randomUser} />
        </Content>
      </Container>
    </>
  );
}

