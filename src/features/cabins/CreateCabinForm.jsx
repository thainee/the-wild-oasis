import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { convertBackendFormat } from '../../utils/helpers';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;

  const { id: updateId, ...updateValues } = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    const convertedData = convertBackendFormat(data);
    if (isUpdateSession)
      updateCabin(
        { newCabin: { ...convertedData, image }, id: updateId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...convertedData, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'Name is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Max capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'Max capacity is required',
            min: {
              value: 1,
              message: 'Max capacity must be at least 1',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'Regular price is required',
            min: {
              value: 1,
              message: 'Regular price must be at least 1',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'Discount is required',
            min: {
              value: 0,
              message: 'Regular price must be positive number',
            },
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount must be less than or equal to regular price',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'Description is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isUpdateSession ? false : 'Image is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isUpdateSession ? 'Update cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
