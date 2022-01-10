import Axios, { AxiosResponse } from 'axios'
import tw from "twin.macro";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as TwitterIcon } from "../assets/twitter-icon.svg";
import { ReactComponent as GitHubIcon } from "../assets/github-icon.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin-icon.svg";

import { myContext } from "../hooks/Context"
import React, { useEffect, useState, useContext } from "react"
import { IUser } from "../interface"


const Content = tw.div`flex flex-col justify-center h-full px-6 text-gray-100`
const Header = tw.header`px-5 py-4 border-b border-gray-100`

const H2 = tw.h2`font-semibold text-gray-300`

const Card = tw.div`flex rounded shadow max-w-lg text-gray-600 mb-5 bg-white`

const CardImageContainer = tw.div`self-center p-2 pr-1`

const CardImage = tw.img`h-10 w-10 border p-0.5 rounded-full`

const CardTextContainer = tw.div`self-center p-2 w-64`

const CardName = tw.div`text-sm`

const CardLocation = tw.div`text-xs text-gray-400 -mt-1`

const CardMeta = tw.div`self-center p-2 w-2/6`

const CardMetaFeature = styled.a`
    ${tw`flex items-center mt-4 mr-4 text-xs text-gray-600`}
    svg {
        ${tw`w-5 h-5 mr-1`}
    }
`;

const TableContainer = tw.div`w-full max-w-2xl mx-auto shadow-lg rounded bg-secondary-800`

const Table = tw.table`table-auto w-full`

const TablePadding = tw.div`p-3`

const TableThead = tw.thead`text-xs font-semibold uppercase text-gray-300`

const TableRow = tw.tr``

const TableHeader = tw.th`p-2 whitespace-nowrap font-semibold text-left`

const TableBody = tw.tbody`text-sm divide-y divide-gray-100`

const TableDataCell = tw.td`p-2 whitespace-nowrap`

const TableDataNameContainer = tw.div`flex items-center`

const TableDataImage = tw.img`w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 rounded-full`

const TableDataName = tw.div`font-medium text-gray-100`

const TableDataLocation = tw.div`font-medium text-gray-100 text-left`

const TableDataMeta = tw.div`font-medium text-gray-100 text-left`

export default function Home() {
  const ctx = useContext(myContext)

  const [users, setUsers] = useState<IUser[]>()
  useEffect(() => {
    Axios.get("http://localhost:4000/getallusers").then((res: AxiosResponse) => {
      setUsers(res.data.filter((item: IUser) => {
        return item
      }))
    })
  }, [ctx]);
  console.log(users)
  if (!users) {
    return <p>loading...</p>
  }
  return (
    <>
      <Navbar />


      <Content>
        <TableContainer>
          <Header>
            <H2>
              Showing all users
            </H2>
          </Header>
          <TablePadding>
            <Table>
              <TableThead>
                <TableRow>
                  <TableHeader>
                    Name
                  </TableHeader>
                  <TableHeader>
                    Email
                  </TableHeader>
                  <TableHeader>
                    Spent
                  </TableHeader>
                  <TableHeader>
                    Country
                  </TableHeader>
                </TableRow>
              </TableThead>
              <TableBody>
                {users.map((user: IUser) => {
                  return (

                    <TableRow key={user.id}>
                      <TableDataCell>
                        <TableDataNameContainer>
                          <TableDataImage src={user.json.avatar_url} />
                          <TableDataName>
                            {user.json.name}
                          </TableDataName>
                        </TableDataNameContainer>
                      </TableDataCell>
                      <TableDataCell>
                        <TableDataLocation>
                          {user.json.location}
                        </TableDataLocation>
                      </TableDataCell>
                      <TableDataCell>
                        <TableDataMeta>
                          {user.json.name}
                        </TableDataMeta>
                      </TableDataCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TablePadding>
        </TableContainer>

      </Content>

      <Footer />
    </>
  );
};
