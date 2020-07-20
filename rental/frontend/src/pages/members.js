import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberTable from "../components/MemberTable";
import Wrapper from "../components/Wrapper";

export default ({ current, setCurrent }) => {
  const [members, setMembers] = useState();
  // console.log(setCurrent);

  useEffect(() => {
    if (!members) {
      getMembers();
    }
  });

  const getMembers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/members/?page=1");
      setMembers(data);
    } catch (e) {
      console.log(e);
    }
  };

  return members ? (
    <Wrapper>
      <MemberTable
        setMembers={setMembers}
        counts={members.count}
        results={members.results}
      />
      {/* {console.log(members)} */}
    </Wrapper>
  ) : null;
};
