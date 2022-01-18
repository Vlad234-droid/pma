import React, { useState } from 'react';
import { Button, CreateRule, Rule, theme, Theme, useStyle } from '@dex-ddl/core';
import arrowUp from '../../assets/img/objectives/arrowUp.png';
import editIcon from '../../assets/img/pdp/edit.png';
import trashIcon from '../../assets/img/pdp/trash.png';

const GoalInfo = (props) => {
    const {
        id, 
        title, 
        subtitle, 
        description, 
        data, 
        formElements, 
        deleteGoal,
        editGoal,
    } = props;
    const modifiedTitleRegex = new RegExp(/\*/, 'g');
    const { css, theme} = useStyle();
    const [getToogled, setToogled] = useState(false);
    

    return (
        <div className={css(fullGoals({theme}))}>
            <div className={css(titleBlock({theme}))} onClick={() => setToogled(!getToogled)}>
                {title.replace(modifiedTitleRegex, '')}
                <div className={`${getToogled ? css(rotated) : ''}`}>
                    <img alt={'arrow'} src={arrowUp} />
                </div>
            </div>
            <div className={css(goalBlock({theme}))}>
                <div className={css({fontWeight: 'bold'})}>{subtitle.replace(modifiedTitleRegex, '')}</div>
                <div>{description}</div>
            </div>

            <div className={`${!getToogled ? css(hide) : ''}`}>
                {
                    data && Object.keys(data).map( (key, index) => {
                        if (index !== 0) 
                        
                        return (
                            <div key={formElements[index].label+Math.random()} className={`${css(fullDesc)} ${css(goalBlock({theme}))}`}>
                                <div className={css({fontWeight: 'bold'})}>{formElements[index].label.replace(modifiedTitleRegex, '')}</div>
                                <div>{data[key]}</div>
                            </div>
                        )
                    })
                }

                

                <div className={css(btnBlock)}>
                    <Button styles={[btns]} onPress={() => editGoal(id)}>
                        <div>
                            <img className={`${css(icon)} ${css(editImg)}`} alt='edit' src={editIcon} />
                        </div>
                        <div className={css({marginLeft: '5px'})}>Edit</div>
                    </Button>

                    <Button styles={[btns]} onPress={() => deleteGoal(id)}>
                        <img className={css(icon)} alt='edit' src={trashIcon} />
                        <div className={css({marginLeft: '5px'})}>Delete</div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

const editImg = {
    width: '14px',
} as Rule;

const icon = {
    merginRight: '5px',
    width: '16px',
} as Rule;

const btnBlock = {
    margin: '24px 0 32px 0',
    display: 'flex',
    fontWeight: 'bold',
} as Rule;

const btns = {
    background: 'none',
    color: `${theme.colors.tescoBlue}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '34px',
    boxSizing: 'border-box',
    padding: '8px 16px',
    marginRight: '21px',
} as Rule;

const fullGoals: CreateRule<{ theme: Theme; }> = (props) => {
    if (props == null) return {};
    const { theme } = props;
    return {
        borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
    };
  };

const goalBlock: CreateRule<{ theme: Theme; }> = (props) => {
    if (props == null) return {};
    const { theme } = props;
    return {
        paddingBottom: '16px',
        fontSize: `${theme.font.fixed.f14}`,
        lineHeight: '18px',
        userSelect: 'none',
    };
  };

const fullDesc = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flexDirection: 'column',
} as Rule;

const hide = {
    display: 'none',
} as Rule;

const titleBlock: CreateRule<{ theme: Theme; }> = (props) => {
    if (props == null) return {};
    const { theme } = props;
    return {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0 16px 0',
        fontFamily: 'TESCO Modern',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: '20px',
        letterSpacing: '0px',
        color: `${theme.colors.link}`,
    };
  };

const rotated = {
    transform: 'rotate(180deg)',
} as Rule;

export default GoalInfo;