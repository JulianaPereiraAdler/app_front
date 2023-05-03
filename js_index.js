/*
  --------------------------------------------------------------------------------------------------------------------------------------------------
  Funções do card 'Tags' 
  --------------------------------------------------------------------------------------------------------------------------------------------------
*/
function preencher_card_tags(){
  //busca informações das tags e preenche card 'Tags' com tag categoria
  $.ajax({
      url: "http://127.0.0.1:5000/get_tags",
      type: "GET",

        success: function(result){
          div_tags = $(".subtitulo_div_values")
          $.each(result, function (id_categoria_tag, info){
            tag = $(".kbd_tag_sample").clone()
            tag.removeClass("kbd_tag_sample").addClass("kbd_tag").addClass("kbd_tag_categoria").addClass("tag_categoria"+id_categoria_tag)
            tag.data("id_categoria_tag", id_categoria_tag).attr("id_categoria_tag", id_categoria_tag)
            tag.find(".texto_tag").text(info['nome_categoria'])
            tag.data("tags", info['tags']).attr("data-tags", info['tags'])
            tag.data("cor", info['cor']).attr("data-cor", info['cor'])
            tag.css("background-color", info['cor'])
            tag.show()
            div_tags.append(tag)

            optgroup = $("<optgroup label='"+info['nome_categoria']+"'></optgroup>")
            $.each(info['tags'], function (id_tag, nome){
              option = "<option value='"+id_tag+"'>"+nome+"</option>"
              optgroup.append(option)
            })
            $("#select2_tags").append(optgroup)

            el_append = $("<option value = '" + id_categoria_tag + "'> " + info['nome_categoria'] + " </option>");
            $("#select2_categoria_tags").append(el_append)
          })

          $('#select2_tags').select2({
            width: '100%',
            placeholder: "",
            dropdownParent: $('#modal_view_termo'),
            //border: "none",
            //multiple: true,
            allowClear: true,
          })

          $('#select2_categoria_tags').select2({
            width: '100%',
            placeholder: "",
            dropdownParent: $('#modal_view_termo'),
            //border: "none",
            //multiple: true,
            allowClear: true,
          })
        },

        complete: function(){
          $(".loader_tag").removeClass("be-loading-active")

        }, 

        beforeSend: function(){
          $(".kbd_tag_categoria").remove()
          $(".kbd_tag_termo").remove()
          $("#select2_tags").empty()
          $('#select2_categoria_tags').empty()
          $(".loader_tag").addClass("be-loading-active")
        }
    })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
function mostrar_tags_subcategoria(id_categoria_tag){
  tags_info = $(".tag_categoria"+id_categoria_tag).data("tags")
  tags_cor = $(".tag_categoria"+id_categoria_tag).data("cor")

  $.each(tags_info, function (id_tag, nome){
    tag = $(".kbd_tag_sample").clone()
    tag.removeClass("kbd_tag_sample").addClass("kbd_tag").addClass("kbd_tag_termo").addClass("tag_termo"+id_tag)
    tag.data("id_tag_termo", id_tag).attr("id_tag_termo", id_tag)
    tag.find(".texto_tag").text(nome)
    tag.css("background-color", tags_cor)
    tag.show()
    div_tags.append(tag)
  })

  $(".kbd_tag_categoria").hide()
  $(".icon_back").show()
  $(".legenda_tag_filtro").show()
  $(".legenda_categoria").hide()
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
function showTagIdCategoria(id_categoria_tag) {
  var table = $('#tabela_termos').DataTable();
  table.rows().every(function() {
    var row = $(this.node());
    if (row.find("kbd[data-id_categoria='" + id_categoria_tag + "']").length > 0) {
      $(this.node()).show();
    } else {
      $(this.node()).hide();
    }
  });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
function showIdTag(id_tag) {
  var table = $('#tabela_termos').DataTable();
  table.rows().every(function() {
    var row = $(this.node());
    if (row.find("kbd[data-id_tag='" + id_tag + "']").length > 0) {
      $(this.node()).show();
    } else {
      $(this.node()).hide();
    }
  });
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function showAllRows() {
  var table = $('#tabela_termos').DataTable();
  $('tr', table.table().node()).show();
}

/*
  --------------------------------------------------------------------------------------------------------------------------------------------------
  Funções dos cards status (termos classificados e não classificados)
  --------------------------------------------------------------------------------------------------------------------------------------------------
*/
function preencher_status_termos(){
  //busca quantidade de termos classificados e não classificados e preenche card 'Status'
    $.ajax({
        url: "http://127.0.0.1:5000/get_status_termos",
        type: "GET",
      
          success: function(result){
            $(".qnt_termos_classificados").text(result['classificados'])
            $(".qnt_termos_pendentes").text(result['pendentes'])
          },
      
          complete: function(){
            $(".loading_status_termos").removeClass("be-loading-active")
          }, 

          beforeSend: function(){
            $(".loading_status_termos").addClass("be-loading-active")
          }

    })
}

/*
  --------------------------------------------------------------------------------------------------------------------------------------------------
  Funções do card Termo de Compromisso 
  --------------------------------------------------------------------------------------------------------------------------------------------------
*/
function preencher_table_termos(){  
  //busca informações dos termos e preenche tabela
    $.ajax({
        url: "http://127.0.0.1:5000/get_info_termos",
        type: "GET",
      
          success: function(result){
            $.fn.dataTable.moment('DD/MM/YYYY');
            $("#tabela_termos").DataTable( {
              destroy: true,
              "pageLength": 25,
              data : result,
              columns: [
                { data: 'classificado',  width: '0px'},
                { data: 'data_assinatura',  width: '45px'},
                { data: 'numero_processo',  width: '130px'},
                { data: 'compromitentes',
                         orderable: false },
                { "defaultContent": "",
                                  orderable: false,
                                  data: null},
                { "defaultContent": "",
                                    orderable: false,
                                    data: null},
                ],
                order: [[1, "desc"]],
                //scrollY: "500px",
                //scrollX: true,
                // columnDefs: [
                //   {targets: 0 }
                // ],
              createdRow: function (row, data, dataIndex) {
                $(row).attr('data-id', data.id).addClass('row_termo').addClass('row_termo_'+data.id)
                if (data.classificado == 1){
                  html_classificado = "<i class='fa-solid fa-check' style='color:#a3baa8;'></i>"
                }else{
                  html_classificado = "<i class='fa-solid fa-hourglass-half' style='color:#dbbda4;'></i>"
                }
                $(row).find('td:eq(0)').html(html_classificado).addClass("icon_status").addClass('text-center')
                $(row).find('td:eq(1)').addClass('text-center').addClass('info_data_assinatura')
                $(row).find('td:eq(2)').addClass('text-center').addClass('info_num_processo')
                $(row).find('td:eq(3)').addClass('info_compromitentes')

                html_tags = ""
                $.each(data.tags, function (i, tag_infos){
                  $.each(tag_infos, function (id, tag_info){
                    html_tag = "<kbd class='kbd_tag kbd_tag_"+i+"' data-id_tag='"+id+"' data-id_categoria='"+tag_info['id_categoria']+"' style='background-color:"+tag_info['cor']+"'><span class='texto_tag'>"+tag_info['nome_tag']+"</span><span class='mdi mdi-close delete_tag' style='display:none;'></span></kbd>"
                    html_tags = html_tags + html_tag
                  })
                })
                $(row).find('td:eq(4)').html(html_tags)
                $(row).find('td:eq(5)').html("<i class='fa-solid fa-list-ul icon_atividade_termo' data-toggle='tooltip' data-placement='top' title='Ver atividades'></i> <i class='icon_expand fa-solid fa-up-right-from-square fa-fw' data-toggle='tooltip' data-placement='top' title='Ver detalhes'></i>").addClass('text-center').addClass('row').addClass('td_icons_tabela')
              }
            })

            $.each(result, function (id, termo_info){
              el_append = $("<option value = '" +  termo_info['id'] + "'> " + termo_info['numero_processo'] + " </option>");
              $("#select2_termos_relacionados_atividades").append(el_append.clone())
            })
            
          },
      
          complete: function(){
            $('#select2_termos_relacionados_atividades').select2({
              width: '100%',
              placeholder: "",
              dropdownParent: $('#modal_registra_atividade'),
              multiple: true,
              allowClear: true,
            })
            $(".loader_termos").removeClass("be-loading-active")
            $('[data-toggle="tooltip"]').tooltip()
            $("#select2_termos_relacionados_atividades").val("").trigger("change")
          }, 

          beforeSend: function(){
            $('#select2_termos_relacionados_atividades').empty()
            $(".loader_termos").addClass("be-loading-active")
          }
      
    })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
function expand_modal_termo(id_termo){
  //expande modal para ver informações do termo e possibilitar edição

  const formDataIDTermo = {
    id_termo: parseInt(id_termo)
  }

  $.ajax({
    url: "http://127.0.0.1:5000/get_info_termo_por_id",
    type: "POST",
    data: formDataIDTermo,
    success: function(result){
      modal = $("#modal_view_termo")
      modal.find("#num_termo_edit").data("id_termo", result['id']).attr("data-id_termo", result['id'])
      modal.find("#num_termo_edit").text(result['numero_processo'])
      modal.find("#data_aprovacao_edit").val(result['data_aprovacao'])
      modal.find("#data_assinatura_edit").val(result['data_assinatura'])
      modal.find("#data_publicacao_edit").val(result['data_publicacao'])
      modal.find("#data_arquivamento_edit").val(result['data_arquivamento'])
      modal.find("#compromitentes_edit").val(result['compromitentes'])
      modal.find("#URL_decisao_edit").val(result['link_decisao'])
      modal.find("#URL_parecer_edit").val(result['link_parecer'])
      modal.find("#resumo_edit").val(result['resumo'])

      if (result['link_parecer'] == null){
        modal.find(".div_doc_parecer").hide()
      }else{
        modal.find(".doc_parecer").attr("href", result['link_parecer'])
        modal.find(".div_doc_parecer").show()
      }

      if (result['link_decisao'] == null){
        modal.find(".div_doc_decisao").hide()
      }else{
        modal.find(".doc_decisao").attr("href", result['link_decisao'])
        modal.find(".div_doc_decisao").show()
      }

      if (result['resumo'] == null){
        modal.find("#resumo_edit").hide()
      }else{
        modal.find("#resumo_edit").show()
      }

      $(".edit_url").hide()
      $(".input_edit_termo").prop('disabled', true)

      html_tags = ""
      $.each(result['tags'], function (i, tag_infos){
        $.each(tag_infos, function (id, tag_info){
          html_tag = "<kbd class='kbd_tag kbd_tag_"+i+"' data-id_tag='"+id+"' data-id_categoria='"+tag_info['id_categoria']+"' data-id_relacionamento='"+i+" ' style='background-color:"+tag_info['cor']+"'><span class='texto_tag'>"+tag_info['nome_tag']+"</span><span class='mdi mdi-close delete_tag' style='display:none;'></span></kbd>"
          html_tags = html_tags + html_tag
        })
      })
      html_tags = html_tags + "<span class='mdi mdi-plus-circle add_tag' data-toggle='tooltip' data-placement='top' title='Adicionar tags'></span>"
      $(".div_tag_expand_termo").html(html_tags)

    },

    complete: function(){
      $("#modal_view_termo").modal("show")
      $('[data-toggle="tooltip"]').tooltip()

    }, 

    beforeSend: function(){
    }

  })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function scraping_cvm(user_name){
  //scraping de informações de processos da CVM

  $.ajax({
    url: "http://127.0.0.1:5000/scraping_cvm",
    type: "GET",

    success: function(resposta){
      descricao = resposta['mensagem']
      lista_termo = resposta['termos_inseridos']
      inserir_atividade(user_name, descricao, lista_termo, null, 1)
    },

    complete: function(){
     
    }, 

    beforeSend: function(){
      $(".loader_termos").addClass("be-loading-active")
    }
  })
}

/*
  --------------------------------------------------------------------------------------------------------------------------------------------------
  Funções do card Atividades Recentes
  --------------------------------------------------------------------------------------------------------------------------------------------------
*/
function preencher_atividades_recentes(n_atividades = null , id_termo  = null, num_processo  = null){
  //busca informações das n_atividades mais recentes e preenche a linha do tempo 'Atividades Recentes'

  const formDataGetAtividade = new FormData()
  if (n_atividades != null){
    formDataGetAtividade.append('n_atividades', n_atividades)
  }
  if (id_termo != null){
    formDataGetAtividade.append('id_termo', id_termo) 
  }

  $.ajax({
  url: "http://127.0.0.1:5000/get_atividades",
  type: "POST",
  data:formDataGetAtividade,
  processData: false,
  contentType: false,

  success: function(result){
    
    if (result.length == ""){
      $(".span_num_termo_atividade").text(num_processo)
      $(".ul_atividades_recentes").hide()
      $(".nenhuma_atividade_termo").show()
    }else{
      $.each(result, function (n, atividade){
        li = $(".sample_li_atividade").clone().removeClass("sample_li_atividade")
        li.addClass("li_atividade").addClass("li_atividade_"+atividade['id_atividade'])
        li.data("id_atividade", atividade['id_atividade']).attr("data-id_atividade", atividade['id_atividade'])
        li.find(".user_name_atividade").text(atividade['user_name'])
        li.find(".descricao_atividade").text(atividade['descricao'])
        li.find(".time_stamp_atividade").text(atividade['timestamp'])
        relacionamentos = JSON.parse(atividade['relacionamentos'])
        $.each(relacionamentos, function (id_termo, num_processo){
          if(id_termo != ''){
            tag_num = li.find(".tag_num_termo_sample").clone()
            tag_num.addClass("tag_num_termo").removeClass("tag_num_termo_sample")
            tag_num.data("id_termo",id_termo).attr("data-id_termo", id_termo)
            tag_num.text(num_processo)
            li.find(".num_termo_atividade").append(tag_num.show())
          }
        })
        $(".ul_atividades_recentes").append(li.show())
      })
      $(".ul_atividades_recentes").show()
      $(".nenhuma_atividade_termo").hide()
    }

  },

  complete: function(){
    $(".loader_atividade").removeClass("be-loading-active")
  }, 

  beforeSend: function(){
    $(".li_atividade").remove()
    $(".tag_num_termo").remove()
    $(".loader_atividade").addClass("be-loading-active")
  }

  })

}
//--------------------------------------------------------------------------------------------------------------------------------------------------

function inserir_atividade(user_name, descricao_atividade, lista_termo=null, atualizar_tags = false, atualizar_tabela = false){
  //insere atividade no banco de dados

  const formDataAddAtividade = new FormData()
  formDataAddAtividade.append('user_name', user_name)
  formDataAddAtividade.append('descricao', descricao_atividade)
  if (lista_termo != null){
    formDataAddAtividade.append('relacionamentos', lista_termo)
  }

  $.ajax({
    url: "http://127.0.0.1:5000/inserir_atividade",
    type: "POST",
    data:formDataAddAtividade,
    processData: false,
    contentType: false,

    success: function(result){
      $.each(result, function (n, atividade){
        li = $(".sample_li_atividade").clone().removeClass("sample_li_atividade")
        li.addClass("li_atividade").addClass("li_atividade_"+atividade['id_atividade'])
        li.data("id_atividade", atividade['id_atividade']).attr("data-id_atividade", atividade['id_atividade'])
        li.find(".user_name_atividade").text(atividade['user_name'])
        li.find(".descricao_atividade").text(atividade['descricao'])
        li.find(".time_stamp_atividade").text(atividade['timestamp'])
        relacionamentos = JSON.parse(atividade['relacionamentos'])
        $.each(relacionamentos, function (id_termo, num_processo){
          if(id_termo != ''){
            tag_num = li.find(".tag_num_termo_sample").clone()
            tag_num.addClass("tag_num_termo").removeClass("tag_num_termo_sample")
            tag_num.data("id_termo",id_termo).attr("data-id_termo", id_termo)
            tag_num.text(num_processo)
            li.find(".num_termo_atividade").append(tag_num.show())
          }
        })
        $(".ul_atividades_recentes").prepend(li.show())
      })

      if (atualizar_tags == true){
        preencher_card_tags()
      }

      if (atualizar_tabela == true){
        preencher_table_termos()
      }

    },

    complete: function(){
      $("#descricao_atividade").val("")
      $("#select2_categoria_tags").val("").trigger("change")
      $("#modal_registra_atividade").modal("hide")
      $(".loader_atividade").removeClass("be-loading-active")
    }, 

    beforeSend: function(){
      $(".loader_atividade").addClass("be-loading-active")
    }

  })


}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function delete_atividade_termo(id_atividade){

  const formDataDelAtividade = new FormData()
  formDataDelAtividade.append('id_atividade', id_atividade)

  $.ajax({
    url: "http://127.0.0.1:5000/delete_atividade_termo",
    type: "DELETE",
    data: formDataDelAtividade,
    processData: false,
    contentType: false,
    success: function(id_atividade){
      $(".li_atividade_"+id_atividade).remove()
    }
  })

}

//--------------------------------------------------------------------------------------------------------------------------------------------------


/*
  --------------------------------------------------------------------------------------------------------------------------------------------------
  Funções Modal Cadastrar Termo
  --------------------------------------------------------------------------------------------------------------------------------------------------
*/

function cadastrar_termo(formData){ 
  //salva termo no banco de dados 
  $.ajax({
    url: "http://127.0.0.1:5000/add_termo",
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
	  
		success: function(result){
      preencher_status_termos()
      preencher_table_termos()

      user_name = $(".nome_usuario").text()
      descricao_atividade = "Cadastrou um novo termo de compromisso manualmente."
      lista_termo = [result['id']]
      inserir_atividade(user_name, descricao_atividade, lista_termo)
		}, 
    
    complete: function(){
      limpa_modal_cadastrar_termo()
    },
	})
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
function limpa_modal_cadastrar_termo(){ 
  //limpa modal de cadastro de termo
  $('#num_processo').val("")
  $('#data_aprovacao').val("")
  $('#data_assinatura').val("")
  $('#data_publicacao').val("")
  $('#compromitentes').val("")
  $('#URL_decisao').val("")
  $('#URL_parecer').val("")
  $('#data_arquivamento').val("")
  $('#modal_registra_termo').modal('hide')
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
/*
  --------------------------------------------------------------------------------------------------------------------------------------------------
  Funções Modal Expnad Termo
  --------------------------------------------------------------------------------------------------------------------------------------------------
*/

function inserir_tag_termo(id_tag, id_termo, num_termo){ 

  const formDataTagTermo = {
    id_tag: parseInt(id_tag),
    id_termo: parseInt(id_termo)
  }

  $.ajax({
    url: "http://127.0.0.1:5000/inserir_tag_termo",
    type: "POST",
    data: formDataTagTermo,

    success: function(result){
      user_name = $(".nome_usuario").text()
      
      html_tag = ""
      $.each(result, function (id, tag_info){
        lista_termo = []
        html_tag = "<kbd class='kbd_tag kbd_tag_"+tag_info['id_relacionamento']+"' data-id_categoria='"+tag_info['id_categoria']+"' data-id_tag='"+id+"' data-id_relacionamento='"+tag_info['id_relacionamento']+"' style='background-color:"+tag_info['cor']+"'><span class='texto_tag'>"+tag_info['nome_tag']+"</span><span class='mdi mdi-close delete_tag' style='display:none;'></span></kbd>"
        //$(".div_tag_expand_termo").append(html_tag)
        $(".div_tag_expand_termo").find(".add_tag").before(html_tag)

        $("tr[data-id='"+id_termo+"']").find("td:eq(4)").append(html_tag)

        html_classificado = "<i class='fa-solid fa-check' style='color:#a3baa8;'></i>"
        $("tr[data-id='"+id_termo+"']").find("td:eq(0)").html(html_classificado)
        lista_termo.push(id_termo)

        descricao_atividade = "Inseriu tag '"+tag_info['nome_tag']+"' (categoria "+tag_info['nome_categoria'] +") no termo "+num_termo
        inserir_atividade(user_name, descricao_atividade, lista_termo, 1)
      })

    },

    complete: function(){
      $("#bnt_inserir_nova_tag").prop('disabled', false)
      $(".nome_nova_cat").val("")
      $(".cor_cat").val("")
      $(".nome_tag").val("")
      $("#select2_categoria_tags").val("").trigger("change")
      preencher_status_termos()
      //preencher_card_tags()
    }, 

    beforeSend: function(){
      $("#bnt_inserir_nova_tag").prop('disabled', true)
    }

  })


}
//--------------------------------------------------------------------------------------------------------------------------------------------------

function delete_relacionamento_tag_termo(id_relacionamento, num_termo, id_termo){ 

  const formDataDel = new FormData()
  formDataDel.append('id_relacionamento', id_relacionamento)

  $.ajax({
    url: "http://127.0.0.1:5000/delete_relacionamento_tag_termo",
    type: "DELETE",
    data: formDataDel,
    processData: false,
    contentType: false,
    success: function(result){
      nome_class = ".kbd_tag_"+id_relacionamento
      $(nome_class).remove()
      $.each(result, function (id_tag, tag_info){
        descricao_atividade = "Excluiu tag '"+tag_info['nome_tag']+"' (categoria "+tag_info['nome_categoria'] +") do termo "+num_termo
        lista_termo =[id_termo]
        user_name = $(".nome_usuario").text()
        inserir_atividade(user_name, descricao_atividade, lista_termo)
      })
    }

  })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function cadastrar_nova_categoria(nome_nova_cat, cor_cat, nome_tag, id_termo, num_termo){

  const formData = new FormData()
  formData.append('nome_nova_cat', nome_nova_cat)
  formData.append('cor_cat', cor_cat)

  $.ajax({
    url: "http://127.0.0.1:5000/cadastrar_nova_categoria",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,

    success: function(result){
      id_categoria = result
    },

    complete: function(){
      cadastrar_nova_tag(id_categoria, nome_tag, id_termo, num_termo)
    }, 

    beforeSend: function(){
      $("#bnt_inserir_nova_tag").prop('disabled', true)
    }
  })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function cadastrar_nova_tag(id_categoria, nome_tag, id_termo, num_termo){
  let id_tag
    
  const formDataTag = new FormData()
  formDataTag.append('id_categoria', id_categoria)
  formDataTag.append('nome_tag',nome_tag)

  $.ajax({
    url: "http://127.0.0.1:5000/cadastrar_nova_tag",
    type: "POST",
    data: formDataTag,
    processData: false,
    contentType: false,

    success: function(result){

      $.each(result, function (id_tag, info){
        id_tag = id_tag
        inserir_tag_termo(id_tag, id_termo, num_termo)
      })
    },

    complete: function(){
    }, 

  })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function editar_termo(){
  modal=$("#modal_view_termo")

  if($(".edit_termo").hasClass("edit_active")){
    $(".edit_termo").removeClass("edit_active")    
    modal.find(".add_tag").hide()
    modal.find(".icon_docs_links").show()
    modal.find(".edit_url").hide()  
    modal.find('.delete_tag').hide()
    modal.find(".bnt_group_edit").hide()
    modal.find(".edit_termo").show()
    $(".input_edit_termo").prop('disabled', true)
  }else{
    $(".edit_termo").addClass("edit_active")
    modal.find(".add_tag").show()
    modal.find(".icon_docs_links").hide()
    modal.find(".edit_url").show()  
    modal.find('.delete_tag').show()
    $(".input_edit_termo").prop('disabled', false)
    modal.find(".bnt_group_edit").show()
    modal.find(".edit_termo").hide()
  }

}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function deletar_termo_compromisso(id_termo, num_termo){
  const formDelTermo = new FormData()
  formDelTermo.append('id_termo', id_termo)

  $.ajax({
    url: "http://127.0.0.1:5000/delete_termo_compromisso",
    type: "DELETE",
    data: formDelTermo,
    processData: false,
    contentType: false,

    success: function(id_termo){
      $(".row_termo_"+id_termo).remove()

      modal=$("#modal_view_termo")
      $(".edit_termo").removeClass("edit_active")    
      modal.find(".add_tag").hide()
      modal.find(".icon_docs_links").show()
      modal.find(".edit_url").hide()  
      modal.find('.delete_tag').hide()
      modal.find(".bnt_group_edit").hide()
      modal.find(".edit_termo").show()
      $(".input_edit_termo").prop('disabled', true)
      modal.modal('hide')

      $("#select2_termos_relacionados_atividades option[value='"+id_termo+"']").remove()
      preencher_status_termos()
      
    },

    complete: function(){
      user_name = $(".nome_usuario").text()
      descricao_atividade = "Excluiu termo de compromisso número "+num_termo+"."
      inserir_atividade(user_name, descricao_atividade, null)

    }, 

  })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------

function editar_termo_banco(formDataEditado, num_termo){
  $.ajax({
    url: "http://127.0.0.1:5000/editar_termo_banco",
    type: "POST",
    data: formDataEditado,
    processData: false,
    contentType: false,

    success: function(id_termo){
      expand_modal_termo(id_termo)
      editar_termo()

      dict_campos={
            'data_aprovacao': "data aprovação",
            'data_assinatura': "data assinatura",
            'data_publicacao': "data publicação",
            'compromitentes': "compromitentes",
            'URL_decisao': "URL da decisao",
            'URL_parecer': "URL do parecer",
            'data_arquivamento': "data arquivamento",
            'resumo': "resumo",
          }

      campos_editados = " Campos editados: "
      i = 0
      for (const key of formDataEditado.keys()) {
        if(key != "id_termo"){
          if(i == 0){
            campos_editados += dict_campos[key] 
          }else{
            campos_editados += ", "+dict_campos[key]
          }
          i += 1
        }

        if(key == "data_assinatura"){
          $(".row_termo_"+id_termo).find(".info_data_assinatura").text(formDataEditado.get(key))
        }
        if(key == "num_processo"){
          $(".row_termo_"+id_termo).find(".info_num_processo").text(formDataEditado.get(key))
        }
        if(key == "compromitentes"){
          $(".row_termo_"+id_termo).find(".info_compromitentes").text(formDataEditado.get(key))
        }
      }

      inserir_atividade($(".nome_usuario").text(), "Editou o termo de compromisso número "+num_termo+"." +  campos_editados, [id_termo])
    },

    beforeSend: function(){
    }

  })
}


//--------------------------------------------------------------------------------------------------------------------------------------------------

function resumir_chatgpr(id_termo, url, chatgpt_key){
    
  const formDatarResumir= new FormData()
  formDatarResumir.append('id_termo', id_termo)
  formDatarResumir.append('url', url)
  formDatarResumir.append('key', chatgpt_key)

  $.ajax({
    url: "http://127.0.0.1:5000/resumir_texto_chatgpt",
    type: "POST",
    data: formDatarResumir,
    processData: false,
    contentType: false,

    success: function(result){
      $("#resumo_edit").val(result)
      $("#resumo_edit").show()
    },

    complete: function(){
      $(".loader_resumo").removeClass("be-loading-active")
    }, 

    beforeSend:function(){
      $(".loader_resumo").addClass("be-loading-active")
    }
  })
}


// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
$(document).ready(function(){

  $('[data-toggle="tooltip"]').tooltip()
  $("#modal_login").modal('show')

  preencher_card_tags()
  preencher_status_termos()
  preencher_table_termos()
  preencher_atividades_recentes(15, null)

  $('#modal_view_termo').on('hide.bs.modal', function () {
    $(".add_new_tag_termo").hide()
    $(".div_tag_expand_termo").find(".delete_tag").hide()
    $(".delete_tag_icon").removeClass('delete_tag_icon_active')
  })

  //modal login ------------------------------------------------------------------------------------------------------------------------------------------

  $('#modal_login').on('shown.bs.modal', function (e) {
    $(".modal-backdrop").css({ opacity:1, 'background-color': '#eeeeee'});
  })

  $('#modal_login').on('hidden.bs.modal', function (e) {
    $(".modal-backdrop").css({ opacity: 0, 'background-color': '#000'});
  })

});


//__________________________________________________________________________________________________________________________________________________
//funções com listen --------------------------------------------------------------------------------------------------------------------------------

//funções menu --------------------------------------------------------------------------------------------------------------------------------

$(document).on("click",'.btn_fazer_login', function(e){
  //ao clicar no botão de sign in, realiza login
  e.preventDefault()
  user_name = $("#nome_usuario_login").val()
  chatgpt_key = $("#chatgpt_key").val()

  if (user_name !="") {
    $(".nome_usuario").text(user_name)
    if(chatgpt_key != ""){
      $(".aviso_key_chatgpt").hide()
      $(".resume_chatgpt").removeClass("desabilitado").prop('disabled', false)
    }else{
      $(".aviso_key_chatgpt").show()
      $(".resume_chatgpt").addClass("desabilitado").prop('disabled', true)
    }
    $(".nome_usuario").data("chatgpt_key", chatgpt_key).attr("chatgpt_key", chatgpt_key)
    $("#modal_login").modal('hide')
    $(".alerta_error_login").hide()
    $("#nome_usuario_login").val("")
    $("#chatgpt_key").val("")

  }else{
    $(".alerta_error_login").show()
  }
  
})

$(document).on("click",'.btn_logout', function(e){
  //ao clicar no botão de logout, chama o modal de login
  e.preventDefault()
  $("#modal_login").modal('show')
})

//funções card tags --------------------------------------------------------------------------------------------------------------------------------

$(document).on("click",'.kbd_tag_categoria', function(e){
  //mostra tags da categoria clicada
  e.preventDefault()
  id_categoria_tag = $(this).data("id_categoria_tag")
  mostrar_tags_subcategoria(id_categoria_tag)
  showTagIdCategoria(id_categoria_tag) 
})

$(document).on("click",'.kbd_tag_termo', function(e){
  //mostra tags da categoria clicada
  e.preventDefault()
  id_tag = $(this).data("id_tag_termo")
  showIdTag(id_tag) 
}) 


$(document).on("click",'.icon_back', function(e){
  //ao clicar no icone de voltar, mostra as categorias de tags
  e.preventDefault()
  $(".icon_back").hide()
  $(".legenda_tag_filtro").hide()
  $(".legenda_categoria").show()
  $(".kbd_tag_categoria").show()
  $(".kbd_tag_termo").hide()
  showAllRows()
})

//modal expand termo --------------------------------------------------------------------------------------------------------------------------------
$(document).on("click",'.edit_termo', function(e){
  editar_termo()
})

$(document).on("click",'.bnt_cancelar_edit', function(e){
  editar_termo()
})

$(document).on("click",'.bnt_fechar_expand', function(e){
  $(".edit_termo").removeClass("edit_active")    
  modal.find(".add_tag").hide()
  modal.find(".icon_docs_links").show()
  modal.find(".edit_url").hide()  
  modal.find('.delete_tag').hide()
  modal.find(".bnt_group_edit").hide()
  modal.find(".edit_termo").show()
  $(".input_edit_termo").prop('disabled', true)
})

$(document).on("click",'.bnt_excluir_termo', function(e){
  num_termo = $("#num_termo_edit").text()
  id_termo = $("#num_termo_edit").data("id_termo")
  if(confirm("Tem certeza que deseja excluir o termo de compromisso número "+num_termo+"?")){
    deletar_termo_compromisso(id_termo, num_termo)
  }
})

$(document).on("click",'.inserir_tag_termo', function(e){ 
  e.preventDefault()
  id_tag - $("#select2_tags").val()
  id_termo = $("#num_termo_edit").data("id_termo")
  num_termo = $("#num_termo_edit").data("id_termo")
  inserir_tag_termo(id_tag, id_termo, num_termo)
})

$(document).on("click",'.bnt_cadastrar_nova_tag', function(e){ 
  e.preventDefault()
  $(".cadastra_tag_cat_existente").addClass("tag_show").show()
  $(".nome_nova_tag").addClass("tag_show").show()
  $(".div_tag_existente").removeClass("tag_show").hide()
})

$(document).on("click",'.bnt_voltar_tag_existente', function(e){ 
  e.preventDefault()
  $(".cadastra_tag_cat_existente").removeClass("tag_show").hide()
  $(".nome_nova_tag").removeClass("tag_show").hide()
  $(".div_tag_existente").addClass("tag_show").show()
})

$(document).on("click",'.bnt_cadastrar_nova_cat_tag', function(e){ 
  e.preventDefault()
  $(".cadastra_tag_cat_existente").removeClass("tag_show").hide()
  $(".cadastra_nova_cat").addClass("tag_show").show()
})

$(document).on("click",'.bnt_voltar_categoria_existente', function(e){ 
  e.preventDefault()
  $(".cadastra_nova_cat").removeClass("tag_show").hide()
  $(".cadastra_tag_cat_existente").addClass("tag_show").show()
})

$(document).on("click",'#bnt_inserir_tag', function(e){ 
  e.preventDefault()
  id_tag = $("#select2_tags").val()
  id_termo = $("#num_termo_edit").data("id_termo")
  num_termo = $("#num_termo_edit").text()
  inserir_tag_termo(id_tag, id_termo, num_termo)
})

$(document).on("click",'#bnt_inserir_nova_tag', function(e){ 
  e.preventDefault()
  nome_tag = $(".nome_tag").val()
  id_termo = $("#num_termo_edit").data("id_termo")
  num_termo = $("#num_termo_edit").text()

  if ($(".cadastra_nova_cat").is(":visible")) {
    //cadastrar nova categoria
    nome_nova_cat = $(".nome_nova_cat").val()
    cor_cat = $(".cor_cat").val()
    cadastrar_nova_categoria(nome_nova_cat, cor_cat, nome_tag, id_termo, num_termo)
  }

  if ($(".cadastra_tag_cat_existente").is(":visible")) {
    //cadastrar nova categoria
    id_categoria = $("#select2_categoria_tags").val()
    cadastrar_nova_tag(id_categoria, nome_tag, id_termo, num_termo)
  }
})

$(document).on("click",'.add_tag', function(e){
  $(".add_new_tag_termo").show()
})

$(document).on("click",'.delete_tag_icon', function(e){
  if($(this).hasClass('delete_tag_icon_active')) {
    $(".div_tag_expand_termo").find(".delete_tag").hide()
    $(".delete_tag_icon").removeClass('delete_tag_icon_active')
  }else{
    $(".div_tag_expand_termo").find(".delete_tag").show()
    $(".delete_tag_icon").addClass('delete_tag_icon_active')
  }
})

$(document).on("click",'.delete_tag', function(e){
  kbd = $(this).closest(".kbd_tag")
  id_relacionamento = kbd.data("id_relacionamento")
  id_termo = $("#num_termo_edit").data("id_termo")
  num_termo = $("#num_termo_edit").text()
  delete_relacionamento_tag_termo(id_relacionamento, num_termo, id_termo)
})

//-------------------------------------------------------------------------------------------------------------------------------------------------
//funções card termos-------------------------------------------------------------------------------------------------------------------------------

$(document).on("click",'.modal_cadastrar_termo', function(e){
  //abre modal para cadastrar termo
  e.preventDefault()
  $("#modal_registra_termo").modal('show') 
})

$(document).on("click",'.bnt_cancel_add_termo', function(e){
  //limpa modal de cadastrar termo ao clicar no botão cancela
  limpa_modal_cadastrar_termo()
})

$(document).on("click",'.btn_add_termo', function(e){
  //cadastra novo termo na base de dados
  e.preventDefault()
  const formData = new FormData()
  formData.append('num_processo', $('#num_processo').val())
  formData.append('data_aprovacao', $('#data_aprovacao').val())
  formData.append('data_assinatura', $('#data_assinatura').val())
  formData.append('data_publicacao', $('#data_publicacao').val())
  formData.append('compromitentes', $('#compromitentes').val())
  formData.append('URL_decisao', $('#URL_decisao').val())
  formData.append('URL_parecer', $('#URL_parecer').val())
  formData.append('data_arquivamento', $('#data_arquivamento').val())
  formData.append('resumo', $('#resumo').val())
  cadastrar_termo(formData)
})

$(document).on("change",'.input_edit_termo', function(e){
  $(this).addClass("editado")
})

$(document).on("click",'.bnt_edit_save_termo', function(e){
  //cadastra novo termo na base de dados
  e.preventDefault()
  
  if($(".input_edit_termo").hasClass("editado")){
    const formDataEditado = new FormData()
    modal = $("#modal_view_termo")
    id_termo = modal.find("#num_termo_edit").data("id_termo")
    num_termo = modal.find("#num_termo_edit").text()
    formDataEditado.append("id_termo", id_termo)
    $(".editado").each(function() { 
      tipo = $(this).data("tipo")
      formDataEditado.append(tipo, $(this).val())
    })
    editar_termo_banco(formDataEditado, num_termo)
  }
})

$(document).on("click",'.icon_expand', function(e){
  //abre modal para ver informações de um termo específico
  e.preventDefault()
  id_termo = $(this).closest('tr').data('id')
  expand_modal_termo(id_termo)
})

$(document).on("click",'.icon_atividade_termo', function(e){
  //abre modal para ver informações de um termo específico
  e.preventDefault()

  if($(this).hasClass('active')) {
    $(".icon_atividade_termo").removeClass("active")
    n_atividades = 15
    preencher_atividades_recentes(n_atividades, null, null)
  }else{
    $(".icon_atividade_termo").removeClass("active")
    $(this).addClass("active")
    id_termo = $(this).closest('tr').data('id')
    num_processo = $(this).closest('tr').find('.info_num_processo').text()
    preencher_atividades_recentes(null, id_termo, num_processo)
  }
})

$(document).on("click",'.bnt_scraping_cvm', function(e){
  //abre modal para ver informações de um termo específico
  e.preventDefault()
  user_name = $(".nome_usuario").text()
  scraping_cvm(user_name)
})


$(document).on("click",'.resume_chatgpt', function(e){
  //abre modal para ver informações de um termo específico
  e.preventDefault()
  chatgpt_key = $(".nome_usuario").data("chatgpt_key")
  modal = $("#modal_view_termo")
  id_termo = modal.find("#num_termo_edit").data("id_termo")
  url = $(this).closest(".form_body_model").find(".doc_parecer").attr('href')
  resumir_chatgpr(id_termo, url,chatgpt_key)
})



//-------------------------------------------------------------------------------------------------------------------------------------------------
//funções card atividade -------------------------------------------------------------------------------------------------------------------------------

$(document).on("click",'.add_atividade_termo', function(e){
  //abre modal para inserir nova atividade
  e.preventDefault()
  $("#user_name_atividade").val($(".nome_usuario").text())
  $("#modal_registra_atividade").modal('show') 
})

$(document).on("click",'.edit_atividade_termo', function(e){
  e.preventDefault()
  if($(".delete_atividade_termo").is(":visible")){
    $(".delete_atividade_termo").hide()
    $(this).removeClass("active")
  }else{
    $(".delete_atividade_termo").show()
    $(this).addClass("active")
  }
})

$(document).on("click",'.delete_atividade_termo', function(e){
  e.preventDefault()
  id_atividade = $(this).closest('.li_atividade').data('id_atividade')
  delete_atividade_termo(id_atividade)
})


//modal cadastra nova atividade -----------------------------------------------------------------------------------------------------------------------

$(document).on("click",'.btn_add_atividade', function(e){
  //cadastra nova atividade na base de dados
  e.preventDefault()
  user_name = $("#user_name_atividade").val()
  descricao_atividade = $("#descricao_atividade").val()
  lista_termo = $("#select2_termos_relacionados_atividades").val()

  inserir_atividade(user_name, descricao_atividade, lista_termo)
})


