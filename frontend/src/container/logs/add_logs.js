
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import '../../css/style.css';
import { withRouter } from 'react-router-dom';
import constants from '../../utilities/constants';
const constant = constants.getConstant();
export const AddLogs = (props) => {
    // const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [setShowData, setFormData] = useState({});
    // const countryservice = new CountryService();
    const defaultValues = {
        name: '',
        amount: '',
        delivery_date: '',
        delivery_status: '',
        location: ''
    }
    useEffect(() => {
        // countryservice.getCountries().then(data => setCountries(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);

        axios.post(constant.logList, data)
            .then((result) => {
                setShowMessage(true)
            }).catch((error) => setShowMessage(false));
        reset();
    };

    const LogisticsList = () => {
        props.history.push({
            pathname: '/logistics/',
        });
    }
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center">
        <Button label="OK" className="p-button-text" autoFocus onClick={() => LogisticsList()} /></div>;
    

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }} ></i>
                    <h5>Submission Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Logistics Details successfully added!
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Logistics Details Submission</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Vendor Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="amount" control={control} rules={{ required: 'Amount is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.amount} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="amount" className={classNames({ 'p-error': errors.amount })}>Amount*</label>
                            </span>
                            {getFormErrorMessage('amount')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="delivery_date" control={control} render={({ field }) => (
                                    <Calendar id={field.delivery_date} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                )} />
                                <label htmlFor="delivery_date">Delivery Date</label>
                            </span>
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="delivery_status" control={control} rules={{ required: 'Delivery Status is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.delivery_status} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="delivery_status" className={classNames({ 'p-error': errors.delivery_status })}>Delivery Status*</label>
                            </span>
                            {getFormErrorMessage('delivery_status')}
                        </div><br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="location" control={control} rules={{ required: 'Location is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.location} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="location" className={classNames({ 'p-error': errors.location })}>Location*</label>
                            </span>
                            {getFormErrorMessage('location')}
                        </div><br></br>

                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(AddLogs);