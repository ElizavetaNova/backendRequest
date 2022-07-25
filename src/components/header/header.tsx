import logo from '../../images/logo.svg';
import './header.scss';

export const Header = () => {
    return (
        <header className={'header'}>
            <div className={'container'}>
                <div className={'header__wrapper'}>
                    <img
                        src={logo}
                        className={'header__logo'}
                        alt={'logo'}
                    />
                    <p className={'subtitle-1 subtitle-1--white'}>
                        React example
                    </p>
                </div>
            </div>
        </header>
    );
};
