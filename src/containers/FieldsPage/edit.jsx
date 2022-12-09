import React, { Component, lazy } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { Form } from 'react-bootstrap';
import FieldsStore from './FieldsStore/Fields';
import FieldsViewModel from './FieldsViewModels/FieldsViewModel';
import {
  FieldsViewModelContextProvider,
  withFieldsViewModel,
} from './FieldsViewModels/FieldsViewModelContextProvider';
import { CMS_LIST_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';

const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));

const fieldssStore = new FieldsStore();
const fieldsViewModel = new FieldsViewModel(fieldssStore);

const EditFields = observer(
  class EditFields extends Component {
    fieldsViewModel = null;
    formPropsData = {};
    idDelete = '';
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = fieldsViewModel ? fieldsViewModel : null;
      this.state = { dataStatus: {} };
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
      });
      this.fieldsViewModel = this.viewModel ? this.viewModel.getFieldsDetailViewModel() : null;
      this.fieldsViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      await this.fieldsViewModel.initializeData();
      this.forceUpdate();
    }

    render() {
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'Name',
              key: 'name',
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.NAME]
                ? this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.NAME]
                : '',
              className: 'col-12',
              required: true,
              validation: 'required',
              changed: (data) => {
                this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.NAME] = data.target.value;
              },
              blurred: () => {
                this.validator.showMessageFor('Product Name');
              },
            },
            {
              label: 'Alias',
              key: 'alias',
              type: FORM_FIELD_TYPE.INPUT,
              value: '',
              className: 'col-12',
            },

            {
              label: 'Organisation',
              key: 'organisation',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: '',
              className: 'col-12',
              placeholder: 'Select Organisation',
            },
            {
              label: 'Content Type',
              key: 'content_type',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: '',
              className: 'col-12',
              placeholder: 'Select Content Type',
            },
            {
              label: 'Parent Category',
              key: 'parent_category',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: '',
              className: 'col-12',
              placeholder: 'Top Level',
            },
            {
              label: 'Default Template',
              key: 'default_template',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: '',
              className: 'col-12',
              placeholder: 'Inherit',
            },
            {
              label: 'Related category',
              key: 'related_category',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: '',
              className: 'col-12',
            },
            {
              label: 'Category image',
              key: 'category_image',
              type: FORM_FIELD_TYPE.IMAGE,
              value: '',
              className: 'col-12',
            },
            {
              label: 'Intro text',
              key: 'intro_text',
              type: FORM_FIELD_TYPE.EDITOR,
              value: '',
              className: 'col-12',
              changed: (data) => {
                console.log(data);
              },
            },
            {
              label: 'Full text',
              key: 'full_text',
              type: FORM_FIELD_TYPE.EDITOR,
              value: '',
              className: 'col-12',
              changed: (data) => {
                console.log(data);
              },
            },
          ],
        },
      ];
      const formPublish = [
        {
          name: '',
          fields: [
            {
              label: 'Status',
              key: 'status',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: { label: 'Publish', value: 1 },
              className: 'col-12 mb-16 d-flex justify-content-between align-items-center',
              required: true,
              validation: 'required',
              labelClassName: 'fw-normal me-24 ws-nowrap',
              classNameInput: 'w-65',
              option: [
                { label: 'Publish', value: 1 },
                { label: 'UnPublish', value: 2 },
              ],
              changed: (data) => {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.dataStatus = data.value;
              },
            },
          ],
        },
        {
          name: 'Full Category Path for SEF',
          fields: [
            {
              label: '',
              key: 'featured',
              type: FORM_FIELD_TYPE.CHECKBOX,
              value: '',
              className: 'col-12 mb-16',
              option: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
          ],
        },
      ];
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.fieldsViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <FieldsViewModelContextProvider viewModel={fieldsViewModel}>
            <Form>
              <ItemsFormPage
                formPublish={formPublish}
                generateFormSetting={generateFormSetting}
                path="/fields"
                title="txt_add_fields"
                validator={this.validator}
                store={this.fieldsViewModel}
                isEdit={this.isEdit}
              />
            </Form>
          </FieldsViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withFieldsViewModel(EditFields)));
