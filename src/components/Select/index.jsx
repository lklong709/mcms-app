/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import customStyles from './customStyles';
import customClassName from './classNames';
import { withThemeContext } from 'themes/ThemeContextProvider';
import { withTranslation } from 'react-i18next';
class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { t } = this.props;
    let { isBorder, async, placeholder, isShadow, isSemibold } = this.props;
    let styles = customStyles(isBorder, isShadow, isSemibold);
    let classNames = customClassName(isBorder);

    if (async) {
      return (
        <AsyncSelect
          {...this.props}
          classNames={classNames}
          placeholder={placeholder ?? t('txt_select...')}
          styles={styles}
        />
      );
    }

    return (
      <Select
        {...this.props}
        classNames={classNames}
        placeholder={placeholder ?? t('txt_select...')}
        styles={styles}
      />
    );
  }
}

SelectComponent.defaultProps = {
  async: false,
  isMulti: false,
};
export default withTranslation('common')(withThemeContext(SelectComponent));
