class GraphQLController < ApplicationController
  include ParamsHelper

  def execute
    query = params[:query]
    operation_name = params[:operationName]
    variables = ensure_hash(params[:variables])
    context = {
      current_user: current_user
    }

    result = Schema.execute(query, operation_name: operation_name, variables: variables, context: context)

    render json: result
  end

  private

  def current_user
    User.last
  end
end
