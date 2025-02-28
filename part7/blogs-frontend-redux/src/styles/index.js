import styled from 'styled-components'

const Button = styled.button`
  background: lightgrey;
  font-size: 0.9em;
  margin: 0.5em;
  margin-left: 0.25em;
  padding: 0.25em 1em;
  border: 2px solid darkgrey;
  border-radius: 3px;
`
const CreateButton = styled.button`
  background: #3cdb37;
  font-size: 0.9em;
  margin: 1em auto;
  width: 100%;
  padding: 0.25em 1em;
  border: 2px solid #27bd27;
  border-radius: 3px;
  color: white;
  font-weight: bold;
`
const DeleteButton = styled.button`
  background:rgb(219, 71, 55);
  font-size: 0.9em;
  margin: 1em auto;
  width: 10em;
  padding: 0.25em 1em;
  border: 2px solidrgb(128, 34, 10);
  border-radius: 3px;
  color: white;
  font-weight: bold;
`
const Form = styled.form`
  margin-left: 0.5em;
  margin-bottom: 1em;
  width: fit-content;
  padding: 0.5em;
`

const Label = styled.label`
  display: inline-block;
  margin-right: 0.5em;
  margin-left: 0.25em;
  width: fit-content;
`

const InputText = styled.input`
    border: 1px solid darkgrey;
    border-radius: 3px;
    width: 70%;
    margin: 2px;
`

const BlogAccessDiv = styled.div`
  border: 2px solid deepskyblue;
  border-radius: 5px;
  width: 75%;
  padding: 0.4em 0.5em;
  margin: 0.25em 0.1em;
  font-size: 1.5em;
  font-weight: bold;
  background:rgb(209, 229, 236);
`

const BlogDiv = styled.div`
  padding: 0.4em 0.5em;
  margin: 0.25em 0.1em;
  background: rgb(198, 240, 235);
  width: 60%
  `
const MenuDiv = styled.div`
  padding: 0.4em 0.5em;
  margin: 0.25em 0.1em;
  margin-top: 0;
  background: rgb(218, 227, 226);
  width: fit-content;
  border: 2px solid darkgrey;
  border-radius: 3px;
  `

export {
  BlogAccessDiv,
  BlogDiv,
  Button,
  CreateButton,
  DeleteButton,
  Form,
  InputText,
  Label,
  MenuDiv
}