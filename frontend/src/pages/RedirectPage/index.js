import React from 'react';
import Header from '../../componentes/Header';
import { Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer } from './styles';
import ShortnerService from '../services/shortnerService';

class RedirectPage extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isLoading: false,
            ulr: '',
            errorMessage: '',
        }
    }

    async componentDidMount() {
        const { code } = this.props.match.params;

        try {
            const service = new ShortnerService();
            const { url } = await service.getLink(code);

            window.location = url;
        } catch (error) {
            this.setState({ isLoading: false, errorMessage: 'Ops, a url solicitada não existe.'});
        }
    }

    render() {
        const { errorMessage } = this.state;

        return(
            <Container>
                {errorMessage ? (
                    <>
                      <Header>
                          Seu novo encurtador de urls. :)
                      </Header>
                      <StatsContainer className="text-center">
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="m-3">{errorMessage}</p>
                        <a className="btn btn-primary" href="/">Encurtar nova URL</a>
                      </StatsContainer>
                    </>
                ) : (
                    <p className="text-center">Redirecionando...</p>
                )}
            </Container>
        )
    }
}

export default RedirectPage;