import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { convertBackendFormat } from '../../utils/helpers';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data) {
    const newCabin = convertBackendFormat(data);
    mutate(newCabin);
  }

  function onError(error) {
    // console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'Name is required',
          })}
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'Discount is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount must be less than or equal to regular price',
          })}
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={null}>
        <FileInput id='image' accept='image/*' />
        disabled={isCreating}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
