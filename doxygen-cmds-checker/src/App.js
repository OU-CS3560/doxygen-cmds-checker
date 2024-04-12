import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import doxygen_cmds from "./doxygen_cmds.json";

const StyledAppContainer = styled.div`
  width: 600px;
  margin: 10px auto auto auto;
`;

const StyledRow = styled.div`
  display: block;
`;

const StyledButton = styled.button`
  margin: 2px;
`;

const takeNthColumn = (n, value) => {
  const lines = value.split("\n");
  const firstColumns = lines.map((line) => {
    line = line.trim();

    if (line.length !== 0) {
      const tokens = line.split(/\s/);
      if (tokens.length !== 0 && n <= tokens.length) {
        return tokens[n - 1];
      }
      return line;
    }
    return line;
  });

  return firstColumns.join("\n");
};

const App = () => {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState([]);
  const [unknownCmds, setUnknownCmds] = useState([]);

  const parseText = (value) => {
    // Parse input to tokens.
    const lines = value.split("\n");
    let allTokens = [];
    lines.forEach((line) => {
      line = line.trim();

      if (line.length !== 0) {
        const tokens = line
          .split(",")
          .map((v) => {
            v = v.trim();
            if (v[0] === "\\" || v[0] === "@") {
              v = v.slice(1);
            }
            return v;
          })
          .filter((v) => v.length !== 0);
        allTokens.push(...tokens);
      }
    });

    // Filter to only unknown commands.
    const newUnknownCmds = allTokens.filter(
      (v) => !doxygen_cmds.command_names.includes(v)
    );

    setTokens(allTokens);
    setUnknownCmds(newUnknownCmds);
  };

  let unknownCmdsList;
  if (unknownCmds.length === 0 && tokens.length === 0) {
    unknownCmdsList = <p></p>;
  } else if (unknownCmds.length === 0) {
    unknownCmdsList = <p>All tokens are Doxygen commands</p>;
  } else {
    let items = unknownCmds.map((token) => <li key={token}>{token}</li>);
    unknownCmdsList = (
      <>
        <p>These are not Doxygen commands</p>
        <ul>{items}</ul>
      </>
    );
  }

  return (
    <StyledAppContainer>
      <section>
        <h3>Doxygen Commands Checker</h3>
        <p>Paste the student's answer in here to check.</p>
        <StyledRow>
          <StyledButton
            onClick={(event) => {
              setText("");
              setTokens([]);
              setUnknownCmds([]);
            }}
          >
            Clear
          </StyledButton>
          <StyledButton
            onClick={(event) => {
              const newText = takeNthColumn(1, text);
              setText(newText);
              parseText(newText);
            }}
          >
            Take First Column
          </StyledButton>
        </StyledRow>
        <textarea
          rows="20"
          cols="80"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            parseText(event.target.value);
          }}
        ></textarea>
      </section>
      <section>{unknownCmdsList}</section>
    </StyledAppContainer>
  );
};

export default App;
