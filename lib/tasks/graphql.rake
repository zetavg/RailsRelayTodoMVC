namespace :graphql do
  desc "Generate a dump of the GraphQL schema"
  task dump_schema: :environment do
    schema_dump_filepath = Rails.root.join('schema.graphql')

    File.open(schema_dump_filepath, "w+") do |f|
      f.write GraphQL::Schema::Printer.print_schema(Schema)
    end

    puts "Successfully generated GraphQL schema dump: #{schema_dump_filepath}"
  end
end
