import { NextResponse } from 'next/server';
import { Model } from 'mongoose';
import connect from '../db/connect';

export default async function onApi(
	operation: () => Promise<any>,
	successStatus: number,
	operationName: string
) {
	// TODO: Implement authorization
	try {
		await connect();
		const result = await operation();
		if (result === null || result === undefined) {
			return NextResponse.json(
				{
					error: `Not found while ${operationName}`,
				},
				{ status: 404 }
			);
		}
		return NextResponse.json(result, { status: successStatus });
	} catch (error) {
		console.log(`Error ${operationName}`, error);

		return NextResponse.json(
			{
				error: `An error occurred while ${operationName}`,
			},
			{ status: 500 }
		);
	}
}

export function createApiHandler<T, InputType>(model: Model<T>) {
	async function POST(request: Request) {
		const data: InputType = await request.json();
		if (!data) {
			return NextResponse.json(
				{ error: 'Data is required' },
				{ status: 400 }
			);
		}

		const response = await onApi(
			() => model.create(data),
			201,
			`creating ${model.modelName.toLowerCase()}`
		);
		return response;
	}

	async function GET() {
		const response = await onApi(
			() => model.find(),
			200,
			`getting ${model.modelName.toLowerCase()}s`
		);
		return response;
	}

	async function PUT(request: Request, context: any) {
		const { id }: { id: string } = context.params;

		const data: InputType = await request.json();

		if (!data) {
			return NextResponse.json(
				{
					error: `New ${model.modelName.toLowerCase()} data is required`,
				},
				{ status: 400 }
			);
		}

		const response = await onApi(
			() => model.updateOne({ _id: id }, data),
			200,
			`updating ${model.modelName.toLowerCase()}`
		);
		return response;
	}

	async function DELETE(request: Request, context: any) {
		const { id }: { id: string } = context.params;

		const response = await onApi(
			() => model.deleteOne({ _id: id }),
			200,
			`deleting ${model.modelName.toLowerCase()}`
		);
		return response;
	}

	return { POST, GET, PUT, DELETE };
}
