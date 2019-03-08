import React from "react";

// shamelessly copied from https://codesandbox.io/s/lkkjpr5r7?from-embed
class DisplayPic extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) { return; }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      console.log(nextProps);
      reader.readAsDataURL(nextProps.file);
    });
  }

  render() {
    const { file, fileUrl } = this.props;
    const { loading, thumb } = this.state;

    if (!file && !fileUrl) { return null; }

    if (loading) { return <p>loading...</p>; }

    return (<img src={thumb || fileUrl}
      alt={file ? file.name : fileUrl}
      height={200}
      width={200} />);
  }
}

export default DisplayPic;
