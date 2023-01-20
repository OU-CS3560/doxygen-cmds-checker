import React from 'react';
import styled from 'styled-components';
import doxygen_cmds from './doxygen_cmds.json';

const StyledAppContainer = styled.div`
  width: 600px;
  margin: 10px auto auto auto;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      tokens: [],
      unknown_cmds: []
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // Parse input to tokens.
    const lines = event.target.value.split("\n");
    let all_tokens = [];
    lines.forEach(line => {
      line = line.trim();
      if (line.length !== 0) {
        const tokens = line.split(",").map(v => {
          v = v.trim();
          if (v[0] === '\\' || v[0] === '@') {
            v = v.slice(1);
          }
          return v;
        }).filter(v => v.length !== 0);
        all_tokens.push(...tokens);
      }
    });

    // Filter to only unknown commands.
    const unknown_cmds = all_tokens.filter(v => !doxygen_cmds.command_names.includes(v));

    this.setState({
      text: event.target.value,
      tokens: all_tokens,
      unknown_cmds: unknown_cmds
    });
  }

  render() {
    let unknown_cmds_list;
    if (this.state.unknown_cmds.length === 0 && this.state.tokens.length === 0) {
      unknown_cmds_list = <p></p>
    } else if (this.state.unknown_cmds.length === 0) {
      unknown_cmds_list = <p>All tokens are Doxygen commands</p>
    } else {
      let items = this.state.unknown_cmds.map((token) => 
        <li key={token}>{token}</li>
      );
      unknown_cmds_list = (<>
        <p>These are not Doxygen commands</p>
        <ul>{items}</ul>
      </>);
    }

    return (
      <StyledAppContainer>
        <section>
          <h3>List of tokens</h3>
          <textarea rows="5" cols="50" value={this.state.text} onChange={this.handleChange}></textarea>
        </section>
        <section>
          {unknown_cmds_list}
        </section>
      </StyledAppContainer>
    );
  }
}

export default App;
